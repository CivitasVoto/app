pragma solidity ^0.4.24;

import "../token/SmartToken.sol";

/*
    Community interface
*/
contract ICommunity {
    function owner() public pure returns (address) {}
    function name() public pure returns (string) {}
    function benefit() public pure returns (string) {}
    function token() public pure returns (SmartToken) {}
}
