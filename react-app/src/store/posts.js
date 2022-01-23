//action types
const ALLPOSTS = "set/ALLPOSTS";
const FOLLOWPOSTS = "set/FOLLOWPOSTS";
const PAGEPOSTS = "set/PAGEPOSTS";
const ADDPOST = "set/ADDPOST";

const addPost = (post) => {
  return { type: ADDPOST, post };
};

const getPage = (pagePosts) => {
  return {
    type: PAGEPOSTS,
    pagePosts,
  };
};
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

export const getPagePosts = (id) => async (dispatch) => {
  const res = await fetch(`/api/pages/${id}/posts`);

  if (res.ok) {
    const { posts_t } = await res.json();
    dispatch(getPage(posts_t));
    return posts_t;
  } else {
    return null;
  }
};

export const addOnePost = (id, post) => async (dispatch) => {
  const res = await fetch(`/api/pages/${id}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (res.ok) {
    const post = await res.json();
    dispatch(addPost(post));
    return post;
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
    case PAGEPOSTS:
      return action.pagePosts;
    case ADDPOST:
      return [...state, action.post];
    default:
      return state;
  }
}

export default postList;
