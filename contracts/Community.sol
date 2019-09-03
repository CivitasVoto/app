pragma solidity 0.4.26;

import "./token/SmartToken.sol";
import "./token/SmartTokenController.sol";

contract Community {
    address public owner;
    string public name;
    string public benefit;
    SmartToken public token;
    SmartTokenController public tokenController;

    constructor(
        address _owner,
        string _name,
        string _tokenName,
        string _tokenSymbol,
        string _benefit
    ) public {
        owner = _owner;
        name = _name;
        benefit = _benefit;
        token = new SmartToken(_tokenName, _tokenSymbol, uint8(1e18));
        tokenController = new SmartTokenController(token);
    }
}
