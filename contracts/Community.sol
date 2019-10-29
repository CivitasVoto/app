pragma solidity ^0.4.26;

import "./Network.sol";
import "./bancor/converter/BancorConverter.sol";

contract Community {
    address public owner;
    string public name;
    SmartToken public token;
    address[] private members;
    BancorConverter public converter;

    mapping (address => bool) public memberExists;

    constructor(
        address _owner,
        string _name,
        string _tokenName,
        string _tokenSymbol
    ) public {
        owner = _owner;
        name = _name;
        token = new SmartToken(_tokenName, _tokenSymbol, 18);

        // Add owner to members.
        memberExists[owner] = true;
        members.push(owner);
    }

    function initializeConnector(
        Network _network,
        uint256 _amountToMint,
        uint32 _reserveRatio,
        uint256 _amountDeposited
    ) public {
        // Mint initial tokens
        token.issue(owner, _amountToMint);
        converter = _network.communityUtils().createConverter(
            _network,
            this,
            _reserveRatio,
            _amountDeposited
        );
        token.transferOwnership(converter);
        converter.acceptTokenOwnership();
    }

    /** @dev Join this community.
     */
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
