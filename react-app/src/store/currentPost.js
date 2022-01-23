const GETPOST = "setPost/GETPOST";

const getPost = (post) => {
  return {
    type: GETPOST,
    post,
  };
};

export const getCurrentPost = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`);
  
  if(res.ok){
      const post = await res.json();
      dispatch(getPost(post));
      return post
  }else{
      return null
  }
};

function currentPost(state = {}, action) {
  switch (action.type) {
    case GETPOST:
      return action.post;
    default:
      return state;
  }
}

export default currentPost;
