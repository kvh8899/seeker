const GETUSERLIKES = "set/GETUSERLIKES";
const ADDUSERLIKE = "set/ADDUSERLIKE";
const DELETEUSERLIKE = "set/DELETEUSERLIKE";

const getLikes = (likes) => {
  return {
    type: GETUSERLIKES,
    likes,
  };
};

const addLike = (like) => {
  return {
    type: ADDUSERLIKE,
    like,
  };
};

const delLike = (like) => {
  return {
    type: DELETEUSERLIKE,
    like,
  };
};

export const getPostLikes = (postList) => async (dispatch) => {
  if (!postList.length) return;
  let res;
  let larr = [];
  for (let i = 0; i < postList.length; i++) {
    res = await fetch(`/api/posts/${postList[i].id}/likes`);
    if (res.ok) {
      const { like } = await res.json();
      larr.push(like);
    }
  }
  dispatch(getLikes(larr));
};

export const addPostLikes = (postId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${postId}`, { method: "POST" });

  if (res.ok) {
    const { like } = await res.json();
    dispatch(addLike(like));
    return like;
  } else {
    return null;
  }
};

export const delPostLikes = (postId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${postId}/delete`, { method: "DELETE" });

  if (res.ok) {
    dispatch(delLike(postId));
    return postId;
  } else {
    return null;
  }
};
function postLikes(state = [], action) {
  switch (action.type) {
    case GETUSERLIKES:
      return action.likes;
    case ADDUSERLIKE:
      return [...state, action.like];
    case DELETEUSERLIKE:
      return state.map((e) => {
        if (e === action.like) return 0;
        return e
      });
    default:
      return state;
  }
}

export default postLikes;
