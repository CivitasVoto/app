pragma solidity ^0.4.26;

import "./interfaces/ICommunity.sol";
import "./bancor/token/SmartTokenController.sol";

contract Community is ICommunity {
    address public owner;
    string public name;
    string public benefit;
    SmartToken public token;
    SmartTokenController public tokenController;
    address[] private members;

    mapping (address => bool) public memberExists;

    constructor(
        address _owner,
        string _name,
        string _benefit,
        string _tokenName,
        string _tokenSymbol
    ) public {
        owner = _owner;
        name = _name;
        benefit = _benefit;
        token = new SmartToken(_tokenName, _tokenSymbol, 18);
        tokenController = new SmartTokenController(token);

        memberExists[owner] = true;
        members.push(owner);
    }

    function join(address _user) public returns (bool success) {
        require(!memberExists[_user], "User is already a member.");

        memberExists[_user] = true;
        members.push(_user);
        return true;
    }

    /** @dev Get a list of the community's members.
     *
     * @return An array of the community's members' addresses.
     */
    function getMembers() public view returns (address[]) { return members; }
}
