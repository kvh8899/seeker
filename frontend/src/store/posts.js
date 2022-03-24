//action types
const ALLPOSTS = "set/ALLPOSTS";
const FOLLOWPOSTS = "set/FOLLOWPOSTS";
const PAGEPOSTS = "set/PAGEPOSTS";
const ADDPOST = "set/ADDPOST";
const DELETEPOST = "set/DELETEPOST";
const ADDMOREALLPOSTS = "set/ADDMOREALL";
const ADDMOREFOLLOWPOSTS = "set/ADDMOREFOLLOW";
const deletePost = (postId) => {
  return {
    type: DELETEPOST,
    postId,
  };
};

const addPost = (post) => {
  return { type: ADDPOST, post };
};

const addMoreAllPosts = (posts) => {
  return {
    type: ADDMOREALLPOSTS,
    payload: posts,
  };
};
const addMoreFollowPosts = (posts) => {
  return {
    type: ADDMOREFOLLOWPOSTS,
    payload: posts,
  };
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
export const getMoreAllPosts = (index) => async (dispatch) => {
  const res = await fetch(`/api/posts?offset=${index}`);

  if (res.status < 500) {
    const { posts_t } = await res.json();
    if (!posts_t.length) return index;
    dispatch(addMoreAllPosts(posts_t));
    return index + 1;
  } else {
    return 0;
  }
};

export const getMoreFollowedPosts = (index) => async (dispatch) => {
  const res = await fetch(`/api/posts/following?offset=${index}`);

  if (res.status < 500) {
    const { posts_t } = await res.json();
    if (!posts_t.length) return index;
    dispatch(addMoreFollowPosts(posts_t));
    return index + 1;
  } else {
    return 0;
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
  } else if (res.status < 500) {
    const { errors } = await res.json();
    return errors;
  } else {
    return "An error has occured";
  }
};

export const deleteOnePost = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}/delete`, { method: "DELETE" });

  if (res.ok) {
    const isSuccess = await res.json();
    dispatch(deletePost(id));
    return isSuccess;
  } else {
    const isFailure = await res.json();
    return isFailure;
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
    case DELETEPOST:
      return state.filter((e) => e.id === action.postId);
    case ADDMOREALLPOSTS:
      return [...state, ...action.payload];
    case ADDMOREFOLLOWPOSTS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export default postList;
