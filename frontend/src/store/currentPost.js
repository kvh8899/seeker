const GETPOST = "setPost/GETPOST";
const EDITPOST = "setPost/EDITPOST";

const editPost = (post) => {
  return {
    type: EDITPOST,
    post,
  };
};

const getPost = (post) => {
  return {
    type: GETPOST,
    post,
  };
};

export const editCurrentPost = (post, id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}/edit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (res.ok) {
    const { post } = await res.json();
    dispatch(editPost(post));
    return post;
  } else if(res.status < 500){
    const {errors} = await res.json()
    return errors;
  }
};

export const getCurrentPost = (id) => async (dispatch) => {
  if (!id) {
    dispatch(getPost({}));
    return null;
  }
  const res = await fetch(`/api/posts/${id}`);

  if (res.ok) {
    const post = await res.json();
    dispatch(getPost(post));
    return post;
  } else {
    return null;
  }
};

function currentPost(state = {}, action) {
  switch (action.type) {
    case GETPOST:
      return action.post;
    case EDITPOST:
      return action.post;
    default:
      return state;
  }
}

export default currentPost;
