// TODO: WARNING - CURRENTLY COSTS CRAZY GAS AND DOESN'T WORK
pragma solidity ^0.4.26;

import "./bancor/token/SmartToken.sol";
import "./bancor/utility/ContractRegistry.sol";
import "./bancor/converter/BancorConverter.sol";
import "./bancor/BancorConverterRegistry.sol";

contract NetworkUtils {
    /** @dev Create new converter for community SmartToken.
     */
    function createConverter(
        SmartToken _communityToken,
        ContractRegistry _contractRegistry,
        SmartToken _networkToken,
        BancorConverterRegistry _converterRegistry
    ) public {
        BancorConverter converter = new BancorConverter(
            _communityToken, // Create for this community's smart token
            _contractRegistry,
            10000, // Max conversion fee (1%)
            _networkToken, // Initial connector token
            1000000 // Connector weight PPM (100%)
        );

        // Register new converter for community SmartToken.
        BancorConverterRegistry registry = BancorConverterRegistry(_converterRegistry);
        registry.registerConverter(_communityToken, converter);
    }
}
