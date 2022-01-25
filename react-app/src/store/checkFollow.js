const ISFOLLOW = "set/ISFOLLOW";

const checkUserFollow = (follow) => {
  return {
    type: ISFOLLOW,
    follow,
  };
};
export const checkFollow = (pageId, session) => async (dispatch) => {
  if (!session) {
    dispatch(checkUserFollow(false));
    return;
  }
  const res = await fetch(`/api/follows/${pageId}`);

  if (res.ok) {
    const { follow } = await res.json();
    dispatch(checkUserFollow(follow));
  }
};

function isFollowing(state = false, action) {
  switch (action.type) {
    case ISFOLLOW:
      return action.follow;
    default:
      return state;
  }
}

export default isFollowing;
