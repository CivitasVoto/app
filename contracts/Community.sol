pragma solidity 0.4.26;

contract Community {
    address public owner;
    string public name;
    string public tokenName;
    string public tokenSymbol;
    int public initialPrice;
    string public benefit;

    event Created(string name);

    constructor(
        string _name,
        string _tokenName,
        string _tokenSymbol,
        int _initialPrice,
        string _benefit
    ) public {
        owner = msg.sender;
        name = _name;
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        initialPrice = _initialPrice;
        benefit = _benefit;

        emit Created(name);
    }
}
