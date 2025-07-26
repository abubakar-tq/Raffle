-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil 

DEFAULT_ANVIL_KEY := 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

RAFFLE_FACTORY_ADDRESS := 0x0f5D1ef48f12b6f691401bfe88c2037c690a6afe


help:
	@echo "Usage:"
	@echo "  make deploy [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""
	@echo ""
	@echo "  make fund [ARGS=...]\n    example: make deploy ARGS=\"--network sepolia\""

all: clean remove install update build

# Clean the repo
clean  :; forge clean

# Remove modules
remove :; rm -rf .gitmodules && rm -rf .git/modules/* && rm -rf lib && touch .gitmodules && git add . && git commit -m "modules"

install :; forge install cyfrin/foundry-devops@0.2.2 --no-commit && forge install smartcontractkit/chainlink-brownie-contracts@1.1.1 --no-commit && forge install foundry-rs/forge-std@v1.8.2 --no-commit && forge install transmissions11/solmate@v6 --no-commit

# Update Dependencies
update:; forge update

build:; forge build

test :; forge test 

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

NETWORK_ARGS := --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) --broadcast -vvvv


deploy-sepolia:; @forge script script/DeployRaffleFactory.s.sol:DeployRaffleFactory --rpc-url $(SEPOLIA_RPC_URL) --account sepkey --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvv

deploy-anvil:
	forge script script/DeployRaffleFactory.s.sol:DeployRaffleFactory $(NETWORK_ARGS)

deploy-raffle-anvil:
	forge script script/DeployRaffle.s.sol:DeployRaffle $(NETWORK_ARGS)

	
createSubscription:
	forge script script/Interaction.s.sol:CreateSubscription $(NETWORK_ARGS)

addConsumer:
	@forge script script/Interaction.s.sol:AddConsumer $(NETWORK_ARGS)

fundSubscription:
	@forge script script/Interaction.s.sol:FundSubscription $(NETWORK_ARGS)

createRaffle:
	cast send $(RAFFLE_FACTORY_ADDRESS) "CreateRaffle(string memory,uint256,uint256)" "Test Raffle" 1000000000000000 1000000000000000 --rpc-url http://localhost:8545 --private-key $(DEFAULT_ANVIL_KEY) -vvvvv

getRaffle:
	cast call $(RAFFLE_FACTORY_ADDRESS) "getRaffleById(uint256)" 1 --rpc-url http://localhost:8545 