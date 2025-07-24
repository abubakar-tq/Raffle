// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {DeployRaffle} from "../script/DeployRaffle.s.sol";
import {Raffle} from "./Raffle.sol";
import {VRFCoordinatorV2_5Mock} from "@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock.sol";
import {LinkToken} from "test/mocks/LinkToken.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {AutomationRegistrarInterface} from "../test/mocks/AutomationRegistrarInterface.sol";
import {MockKeeperRegistry2_1} from "@chainlink/contracts/src/v0.8/automation/mocks/MockKeeperRegistry2_1.sol";
import {AutomationStructs} from "../test/mocks/AutomationStructs.sol";

contract RaffleFactory is ConfirmedOwner {
    error RaffleFactory_RaffleAlreadyExists(string name);
    error RaffleFactory_RaffleDoesNotExist(uint256 id);
    error RaffleFactory_RaffleNotOpen(uint256 id);
    error RaffleFactory_PlayerAddressCannotBeZero();
    error RaffleFactory_SubscriptionIdNotSet(uint256 subscriptionId);
    error RaffleFactory_AmountMustBeGreaterThanZero(uint256 amount);

    event RaffleCreated(uint256 indexed raffleId, address indexed raffleAddress, string name);

    uint96 private constant UPKEEP_LINK_INITIAL_FUNDS = 0.5 ether; //LINK
    mapping(uint256 => address) private idToRaffle;
    mapping(string => address) private nameToRaffle;
    mapping(uint256 => uint256) private raffleToUpkeepId;
    uint256 private s_raffleCount;
    address private s_vrfCoordinator;
    address private s_linkToken;
    uint256 private s_subscriptionId;
    bytes32 private s_gasLane;
    uint32 private s_callbackGasLimit;
    address private s_automationRegistrar;
    address private s_automationRegistry;

    constructor(
        address vrfCoordinator,
        bytes32 gasLane,
        uint32 callbackGasLimit,
        address linkToken,
        address automationRegistrar,
        address automationRegistry
    ) ConfirmedOwner(msg.sender) {
        s_vrfCoordinator = vrfCoordinator;
        s_gasLane = gasLane;
        s_callbackGasLimit = callbackGasLimit;
        s_linkToken = linkToken;
        s_automationRegistrar = automationRegistrar;
        s_automationRegistry = automationRegistry;
    }

    function CreateRaffle(string memory name, uint256 entranceFee, uint256 timeInterval) external onlyOwner {
        if (nameToRaffle[name] != address(0)) {
            revert RaffleFactory_RaffleAlreadyExists(name);
        }
        Raffle raffle =
            new Raffle(entranceFee, timeInterval, s_vrfCoordinator, s_subscriptionId, s_gasLane, s_callbackGasLimit);

        if (s_subscriptionId == 0) {
            createVRFSubscription();
        }

        addConsumerToSubscription(s_raffleCount);
        // Register upkeep
        uint256 upkeepId = registerUpKeep(s_raffleCount, name);

        raffleToUpkeepId[s_raffleCount] = upkeepId;
        idToRaffle[s_raffleCount] = address(raffle);
        nameToRaffle[name] = address(raffle);
        s_raffleCount++;
        emit RaffleCreated(s_raffleCount - 1, address(raffle), name);
    }

    function createVRFSubscription() internal onlyOwner {
        uint256 subscriptionId = VRFCoordinatorV2_5Mock(s_vrfCoordinator).createSubscription();
        setSubscriptionId(subscriptionId);
    }

    function fundVRFSubscription(uint256 amount) external onlyOwner {
        if (amount <= 0) {
            revert RaffleFactory_AmountMustBeGreaterThanZero(amount);
        }
        if (s_subscriptionId == 0) {
            revert RaffleFactory_SubscriptionIdNotSet(s_subscriptionId);
        }

        LinkToken(s_linkToken).transferAndCall(s_vrfCoordinator, amount, abi.encode(s_subscriptionId));
    }

    function addConsumerToSubscription(uint256 raffleId) internal {
        if (s_subscriptionId == 0) {
            revert RaffleFactory_SubscriptionIdNotSet(s_subscriptionId);
        }

        Raffle raffle = Raffle(idToRaffle[raffleId]);

        VRFCoordinatorV2_5Mock(s_vrfCoordinator).addConsumer(s_subscriptionId, address(raffle));
    }

    function setSubscriptionId(uint256 subscriptionId) public onlyOwner {
        s_subscriptionId = subscriptionId;
    }

    function registerUpKeep(uint256 raffleId, string memory name) internal returns (uint256) {
        Raffle raffle = Raffle(idToRaffle[raffleId]);
        if (address(raffle) == address(0)) {
            revert RaffleFactory_RaffleDoesNotExist(raffleId);
        }

        LinkToken(s_linkToken).approve(s_automationRegistry, UPKEEP_LINK_INITIAL_FUNDS);

        AutomationStructs.RegistrationParams memory config = AutomationStructs.RegistrationParams({
            name: name,
            encryptedEmail: "",
            upkeepContract: address(raffle),
            gasLimit: s_callbackGasLimit,
            adminAddress: msg.sender,
            triggerType: 1, 
            checkData: "",
            triggerConfig: "",
            offchainConfig: "",
            amount: UPKEEP_LINK_INITIAL_FUNDS
        });

        uint256 upKeepId = AutomationRegistrarInterface(s_automationRegistrar).registerUpkeep(config);

        return upKeepId;
    }

    function fundUpkeep(uint96 amount,uint256 upKeepId) external onlyOwner {
        if (amount <= 0) {
            revert RaffleFactory_AmountMustBeGreaterThanZero(amount);
        }
        if (upKeepId == 0) {
            revert RaffleFactory_SubscriptionIdNotSet(s_subscriptionId);
        }

        LinkToken(s_linkToken).approve(s_automationRegistry, amount);

        MockKeeperRegistry2_1(s_automationRegistry).addFunds(upKeepId, amount);
    }

    function openRaffle(uint256 id) external onlyOwner {
        Raffle raffle = Raffle(idToRaffle[id]);
        if (address(raffle) == address(0)) {
            revert RaffleFactory_RaffleDoesNotExist(id);
        }

        raffle.openRaffle();
    }

    function getRaffleById(uint256 id) external view returns (address) {
        return idToRaffle[id];
    }

    function getRaffleByName(string memory name) external view returns (address) {
        return nameToRaffle[name];
    }

    function getRaffleCount() external view returns (uint256) {
        return s_raffleCount;
    }

    function getPlayersTotalTickets(uint256 raffleId, address player) external view returns (uint256) {
        Raffle raffle = Raffle(idToRaffle[raffleId]);
        if (address(raffle) == address(0)) {
            revert RaffleFactory_RaffleDoesNotExist(raffleId);
        }
        if (player == address(0)) {
            revert RaffleFactory_PlayerAddressCannotBeZero();
        }
        if (raffle.getRaffleState() != Raffle.RaffleState.OPEN) {
            revert RaffleFactory_RaffleNotOpen(raffleId);
        }
        return raffle.getPlayersTotalTickets(player);
    }
}
