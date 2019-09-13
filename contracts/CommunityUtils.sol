// TODO: WARNING - CURRENTLY COSTS CRAZY GAS AND DOESN'T WORK
pragma solidity ^0.4.26;

import "./Network.sol";
import "./Community.sol";
import "./bancor/utility/ContractRegistry.sol";
import "./bancor/converter/BancorConverter.sol";

contract CommunityUtils {
    /** @dev Create new converter for community SmartToken.
     */
    function createConverter(
        Network _network,
        Community _community
    ) public {
        BancorConverter converter = new BancorConverter(
            _community.token(), // Create for this community's smart token
            _network.contractRegistry(),
            10000, // Max conversion fee (1%)
            _network.networkToken(), // Initial connector token
            1000000 // Connector weight PPM (100%)
        );

        // _community.token().issue(_community.owner(), 1000000000000000000); // Issue 1 Community Token

        // _community.token().transferOwnership(converter);
        // converter.acceptTokenOwnership();

        _community.setConverter(converter);
    }
}
