/**
 * Add community to state.
 */
export function push(state, payload) {
  state.communities.push(payload.community);
}

/**
 * Add member to community.
 */
export function pushMember(state, payload) {
  const community = state.communities.find(
    community => community.address === payload.community
  );
  community.members.push(payload.member);
}
