// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AutomationStructs} from "./AutomationStructs.sol";

interface AutomationRegistrarInterface {
    function registerUpkeep(AutomationStructs.RegistrationParams calldata requestParams) external returns (uint256);
}
