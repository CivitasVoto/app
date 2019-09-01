pragma solidity 0.4.26;

contract Community {
    address public network;
    address public owner;
    string public title;
    string public tokenName;
    string public tokenSymbol;
    int public initialPrice;
    string public benefit;

    constructor(
        address _owner,
        string _title,
        string _tokenName,
        string _tokenSymbol,
        int _initialPrice,
        string _benefit
    ) public {
        network = msg.sender;
        owner = _owner;
        title = _title;
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        initialPrice = _initialPrice;
        benefit = _benefit;
    }
}
