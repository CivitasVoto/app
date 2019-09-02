export function all(state) {
  return state.communities;
}

export function detail(state) {
  return address => {
    return state.communities.find(community => community.address === address);
  };
}
