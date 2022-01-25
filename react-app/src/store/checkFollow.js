const ISFOLLOW = "set/ISFOLLOW";
const UNFOLLOW = "set/UNFOLLOW";
const FOLLOW = "set/FOLLO";

const follow = () => {
  return {
    type: FOLLOW,
  };
};

const unFollow = () => {
  return {
    type: UNFOLLOW,
  };
};

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

export const UnFollow = (pageId) => async (dispatch) => {
  const res = await fetch(`/api/follows/${pageId}/delete`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(unFollow());
  }
};

export const Follow = (pageId) => async (dispatch) => {
  const res = await fetch(`/api/follows/${pageId}`, { method: "POST" });

  if (res.ok) {
    dispatch(follow());
  }
};

function isFollowing(state = false, action) {
  switch (action.type) {
    case ISFOLLOW:
      return action.follow;
    case UNFOLLOW:
      return false;
    case FOLLOW:
      return true;
    default:
      return state;
  }
}

export default isFollowing;
