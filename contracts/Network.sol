pragma solidity ^0.4.26;

import "./interfaces/INetwork.sol";
import "./bancor/utility/ContractRegistry.sol";
import "./bancor/converter/BancorConverter.sol";

contract Network is INetwork {
    Community[] private communities;
    SmartToken public etherToken;
    SmartToken public networkToken;
    BancorConverter public converter;
    ContractRegistry public contractRegistry;

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
        BancorConverter _converter,
        ContractRegistry _contractRegistry
    ) public {
        etherToken = _etherToken;
        networkToken = _networkToken;
        converter = _converter;
        contractRegistry = _contractRegistry;
    }

    /** @dev Create a new community and add to the network's communities.
      *
      * @param _name Name of the community to be created
      * @param _benefit The benefit of joining the community
      * @param _tokenName Name of the community's token
      * @param _tokenSymbol Symbol of the community's token
      */
    function createCommunity(
        string _name,
        string _benefit,
        string _tokenName,
        string _tokenSymbol
    ) public {
        Community community = new Community(
            msg.sender, // Owner
            _name, // Community Name
            _benefit, // Community benefit
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
