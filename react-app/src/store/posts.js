//action types
const ALLPOSTS = "set/ALLPOSTS";
const FOLLOWPOSTS = "set/FOLLOWPOSTS";

const getAll = (allPosts) => {
  return {
    type: ALLPOSTS,
    allPosts,
  };
};

const getFollow = (followPosts) => {
  return { type: FOLLOWPOSTS, followPosts };
};

//get all posts
export const getAllPosts = () => async (dispatch) => {
  const res = await fetch("/api/posts/");

  if (res.ok) {
    const { posts_t } = await res.json();
    dispatch(getAll(posts_t));
    return posts_t;
  } else {
    return null;
  }
};

// get posts user follows
export const getFollowPosts = () => async (dispatch) => {
  const res = await fetch("/api/posts/following");

  if (res.ok) {
    const { posts_t } = await res.json();
    dispatch(getFollow(posts_t));
    return posts_t;
  } else {
    return null;
  }
};

function postList(state = [], action) {
  switch (action.type) {
    case ALLPOSTS:
      return action.allPosts;
    case FOLLOWPOSTS:
      return action.followPosts;
    default:
      return state;
  }
}

export default postList;
