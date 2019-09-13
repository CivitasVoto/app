pragma solidity ^0.4.24;

import "../Community.sol";

/*
    Network interface
*/
contract INetwork {
    function createCommunity(string _name, string _benefit, string _tokenName, string _tokenSymbol) public;
    function getCommunities() public view returns (Community[]);
}
