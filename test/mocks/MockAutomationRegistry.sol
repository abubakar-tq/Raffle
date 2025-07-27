// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import {AutomationStructs} from "./AutomationStructs.sol";

contract MockAutomationRegistry {
    struct Upkeep {
        address target;
        uint32 gasLimit;
        address admin;
        uint8 triggerType;
        uint96 balance;
        bool active;
    }

    mapping(uint256 => Upkeep) public upkeeps;
    uint256 public upkeepCount = 1;
    LinkTokenInterface public immutable LINK_TOKEN;

    event UpkeepRegistered(uint256 indexed id, address target, address admin);
    event FundsAdded(uint256 indexed id, uint96 amount);

    constructor(address linkToken) {
        LINK_TOKEN = LinkTokenInterface(linkToken);
    }

    function registerUpkeep(AutomationStructs.RegistrationParams calldata params) external returns (uint256) {
        require(params.upkeepContract != address(0), "Invalid target");
        require(params.adminAddress != address(0), "Invalid admin");
        require(params.amount > 0, "Invalid amount");

        uint256 upkeepId = upkeepCount++;
        upkeeps[upkeepId] = Upkeep({
            target: params.upkeepContract,
            gasLimit: params.gasLimit,
            admin: params.adminAddress,
            triggerType: params.triggerType,
            balance: params.amount,
            active: true
        });

        emit UpkeepRegistered(upkeepId, params.upkeepContract, params.adminAddress);
        return upkeepId;
    }

    function addFunds(uint256 id, uint96 amount) external {
        require(upkeeps[id].active, "Upkeep not active");
        upkeeps[id].balance += amount;
        emit FundsAdded(id, amount);
    }

    function getBalance(uint256 id) external view returns (uint96) {
        return upkeeps[id].balance;
    }

    // Simulate Chainlink node calling performUpkeep
    function performUpkeep(uint256 id, bytes calldata /*performData*/ ) external {
        require(upkeeps[id].active, "Upkeep not active");
        require(upkeeps[id].balance >= 0.01 ether, "Insufficient upkeep balance"); // Simulate gas cost
        (bool upkeepNeeded, bytes memory performDataResult) =
            AutomationCompatibleInterface(upkeeps[id].target).checkUpkeep(new bytes(0));
        require(upkeepNeeded, "Upkeep not needed");
        upkeeps[id].balance -= 0.01 ether; // Simulate LINK deduction
        AutomationCompatibleInterface(upkeeps[id].target).performUpkeep(performDataResult);
    }
}
