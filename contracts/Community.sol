pragma solidity 0.4.26;

contract Community {
    address public owner;
    string public name;
    string public tokenName;
    string public tokenSymbol;
    uint public tokenInitialPrice;
    string public benefit;

    constructor(
        address _owner,
        string _name,
        string _tokenName,
        string _tokenSymbol,
        uint _tokenInitialPrice,
        string _benefit
    ) public {
        owner = _owner;
        name = _name;
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        tokenInitialPrice = _tokenInitialPrice;
        benefit = _benefit;
    }
}
