const GET = "comments/GET";
const ADD = "comments/ADD";

const getAll = (comments) => {
  return {
    type: GET,
    comments,
  };
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
    default:
      return state;
  }
}

export default postComments;
