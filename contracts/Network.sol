pragma solidity 0.4.26;

import "./Community.sol";
// import "./token/SmartToken.sol";
import "./token/SmartTokenController.sol";

contract Network {
    Community[] private communities;

    event CommunityCreated(
        Network network,
        Community community,
        SmartTokenController token
    );

    /** @dev Create a new community.
      *
      * @param _name Name of the community to be created
      * @param _tokenName Name of the community's token
      * @param _tokenSymbol Symbol of the community's token
      * @param _benefit The benefit of joining the community
      */
    function createCommunity(
        string _name,
        string _tokenName,
        string _tokenSymbol,
        string _benefit
    ) public {
        Community community = new Community(
            msg.sender, // Owner
            _name, // Community Name
            _tokenName, // Token Name
            _tokenSymbol, // Token Symbol
            _benefit // Community benefit
        );
        communities.push(community);
        emit CommunityCreated(
            this,
            community,
            community.tokenController()
        );
    }

    /** @dev Get all communities' contract addresses.
      *
      * @return An array of all communities' contract addresses
      */
    function getAllCommunities() external view returns(Community[] memory){
        return communities;
    }
}
