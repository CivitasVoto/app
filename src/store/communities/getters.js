import { web3 } from "boot/web3";
import contract from "truffle-contract";

import NetworkABI from "src/abis/Network";
import CommunityABI from "src/abis/Network";
import SmartTokenABI from "src/abis/SmartToken";

const Network = contract(NetworkABI);
const Community = contract(CommunityABI);
const SmartToken = contract(SmartTokenABI);

Network.setProvider(web3.currentProvider);
Community.setProvider(web3.currentProvider);
SmartToken.setProvider(web3.currentProvider);

/**
 * Get all communities.
 */
export function all(state) {
  return state.communities;
}

/**
 * Get all network tokens.
 */
export async function networkTokens() {
  const network = await Network.deployed();
  const networkToken = await SmartToken.at(await network.networkToken());
  const etherToken = await SmartToken.at(await network.etherToken());
  let networkTokens = [];

  networkTokens.push({
    name: await networkToken.name(),
    symbol: await networkToken.symbol(),
    address: await network.networkToken()
  });

  networkTokens.push({
    name: await etherToken.name(),
    symbol: await etherToken.symbol(),
    address: await network.etherToken()
  });

  return networkTokens;
}

/**
 * Get all community tokens.
 */
export function communityTokens(state) {
  let communityTokens = [];

  state.communities.forEach(community => {
    communityTokens.push({
      name: community.tokenName,
      symbol: community.tokenSymbol,
      address: community.tokenAddress,
      community
    });
  });

  return [...communityTokens];
}

// export async function allTokens(state, getters) {
//   return getters["communities/communityTokens"]
//     .concat(await getters["communities/networkTokens"])
//     .reverse();
// }

/**
 * Get a community's details by contract address.
 */
export function detailsByAddress(state) {
  return address => {
    return state.communities.find(community => community.address === address);
  };
}
