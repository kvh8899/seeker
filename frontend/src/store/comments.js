const GET = "comments/GET";
const ADD = "comments/ADD";

const getAll = (comments) => {
  return {
    type: GET,
    comments,
  };
};

const addOne = (comment) => {
  return {
    type: ADD,
    comment,
  };
};

export const addOneComment = (postId, comment) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    const comment = await res.json();
    dispatch(addOne(comment));
    return comment;
  } else {
    return null;
  }
};

export const getAllComments = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/comments`);

  if (res.ok) {
    const { comments } = await res.json();
    dispatch(getAll(comments));
    return comments;
  } else {
    return null;
  }
};

function postComments(state = [], action) {
  switch (action.type) {
    case GET:
      return action.comments;
    case ADD:
      return [...state, action.comment];
    default:
      return state;
  }
}

export default postComments;
