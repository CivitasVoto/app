pragma solidity ^0.4.26;

import "./Network.sol";
import "./Community.sol";
import "./bancor/converter/BancorConverter.sol";

contract CommunityUtils {
    /** @dev Create new converter for community SmartToken.
     */
    function createConverter(
        Network _network,
        Community _community,
        uint32 _reserveRatio,
        uint256 _amountDeposited
    ) public returns (BancorConverter) {
        BancorConverter converter = new BancorConverter(
            _community.token(), // Create for this community's smart token
            _network.registry(), // Contract registry
            0.1 * 10000, // Max conversion fee PPM (0.1%)
            _network.networkToken(), // Initial connector token
            _reserveRatio * 10000 // Reserve Ratio PPM (100%)
        );

        _network.networkToken().transfer(converter, _amountDeposited);

        return converter;
    }
}
