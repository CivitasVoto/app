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
        Community _community,
        uint32 conversionFee,
        uint32 reserveRatio,
        uint32 amountToMint
    ) public {
        BancorConverter converter = new BancorConverter(
            _community.token(), // Create for this community's smart token
            _network.contractRegistry(),
            conversionFee * 10000, // Max conversion fee PPM (10%)
            _network.networkToken(), // Initial connector token
            reserveRatio * 10000 // Reserve Ratio PPM (100%)
        );

        _community.token().issue(_community.owner(), amountToMint); // Issue initial tokens

        _community.token().transferOwnership(converter);
        converter.acceptTokenOwnership();

        _community.setConverter(converter);
    }
}
