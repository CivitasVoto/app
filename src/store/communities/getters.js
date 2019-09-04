/**
 * Get all communities.
 */
export function all(state) {
  return state.communities;
}

/**
 * Get a community's details by contract address.
 */
export function detailsByAddress(state) {
  return address => {
    return state.communities.find(community => community.address === address);
  };
}
