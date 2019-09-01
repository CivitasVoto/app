pragma solidity 0.4.26;

import "./Community.sol";

contract Network {
    Community[] private communities;

    event CommunityCreated(
        address networkAddress,
        address communityAddress,
        address owner,
        string title,
        string tokenName,
        string tokenSymbol,
        int initialPrice,
        string benefit
    );

    /** @dev Create a new community.
      *
      * @param _title Title of the community to be created
      * @param _tokenName Name of the community's token
      * @param _tokenSymbol Symbol of the community's token
      * @param _initialPrice Initial price of the community's token
      * @param _benefit The benefit of joining the community
      */
    function createCommunity(
        string _title,
        string _tokenName,
        string _tokenSymbol,
        int _initialPrice,
        string _benefit
    ) public returns (Community) {
        Community community = new Community(msg.sender, _title, _tokenName, _tokenSymbol, _initialPrice, _benefit);
        communities.push(community);
        emit CommunityCreated(
            address(this),
            address(community),
            msg.sender,
            _title,
            _tokenName,
            _tokenSymbol,
            _initialPrice,
            _benefit
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
