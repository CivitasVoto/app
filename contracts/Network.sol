pragma solidity ^0.4.26;

import "./Community.sol";
import "./bancor/token/SmartToken.sol";
import "./bancor/converter/BancorConverter.sol";

contract Network {
    Community[] private communities;
    SmartToken public etherToken;
    SmartToken public networkToken;
    BancorConverter public converter;

    /** @dev Network, Community, and Token addresses of a new community.
     */
    event CommunityCreated(
        Network network,
        Community community,
        SmartToken token
    );

    /** @dev Return joined communities by user address.
     */
    mapping (address => Community[]) userCommunities;

    constructor(
        SmartToken _etherToken,
        SmartToken _networkToken,
        BancorConverter _converter
    ) public {
        etherToken = _etherToken;
        networkToken = _networkToken;
        converter = _converter;
    }

    /** @dev Create a new community and add to the network's communities.
      *
      * @param _name Name of the community to be created
      * @param _tokenName Name of the community's token
      * @param _tokenSymbol Symbol of the community's token
      */
    function createCommunity(
        string _name,
        string _tokenName,
        string _tokenSymbol
    ) public {
        Community community = new Community(
            msg.sender, // Owner
            _name, // Community Name
            _tokenName, // Token Name
            _tokenSymbol // Token Symbol
        );

        communities.push(community);

        emit CommunityCreated(
            this,
            community,
            community.token()
        );
    }

    function createConnector(
        Community _community,
        uint32 _reserveRatio,
        uint256 _amountDeposited
    ) public {
        converter.addConnector(_community.token(), _reserveRatio, false);
        networkToken.transferFrom(_community.owner(), converter, _amountDeposited);
    }

    /** @dev Get a list of the network's communities.
     *
     * @return An array of the network's communities' addresses.
     */
    function getCommunities() public view returns (Community[]) { return communities; }

    /** @dev Add current user to community.
     *
     * @param _community Community to add current user to.
     */
    function joinCommunity(Community _community) public {
        require(_community.join(msg.sender), "Unable to add user to community.");
        userCommunities[msg.sender].push(_community);
    }
}
