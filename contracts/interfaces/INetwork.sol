pragma solidity ^0.4.24;

import "../Community.sol";

/*
    Network interface
*/
contract INetwork {
    function communities() public pure returns (Community[]) {}
}
