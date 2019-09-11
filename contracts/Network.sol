pragma solidity ^0.4.26;

import "./interfaces/INetwork.sol";

contract Network is INetwork {
    Community[] private communities;

    event CommunityCreated(
        Network network,
        Community community,
        SmartToken token
    );

    mapping (address => Community[]) userCommunities;

    /** @dev Create a new community and add to the network's communities.
      *
      * @param _name Name of the community to be created
      * @param _tokenName Name of the community's token
      * @param _tokenSymbol Symbol of the community's token
      * @param _benefit The benefit of joining the community
      */
    function createCommunity(
        string _name,
        string _benefit,
        string _tokenName,
        string _tokenSymbol
    ) public returns (bool success) {
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

        return true;
    }

    /** @dev Get a list of the network's communities.
     *
     * @return An array of the network's communities' addresses.
     */
    function getCommunities() public view returns (Community[]) { return communities; }

    function joinCommunity(Community community) public {
        community.join();
        userCommunities[msg.sender].push(community);
    }
}
