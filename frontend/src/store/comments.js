const GET = "comments/GET";
const ADD = "comments/ADD";
const ADDREP = "comments/ADDREPLY";

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

const rep = (reply) => {
  return {
    type: ADDREP,
    reply,
  };
};

export const replyTo = (commentId, reply) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reply),
  });
  if (res.ok) {
    const reply = await res.json();
    dispatch(rep(reply));
    return reply;
  } else {
    return null;
  }
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

const bfs = (tree, comment) => {
  let queue = [tree];
  while (queue.length > 0) {
    let curr = queue.shift();
    if (curr.id === comment.parent_id) curr.replies.unshift(comment);
    for (let i = 0; i < curr.replies.length; i++) {
      queue.push(curr.replies[i]);
    }
  }
  return tree;
};

const addToTree = (state, comment) => {
  let arr = [];
  state.forEach((e) => {
    arr.push(bfs(e, comment));
  });
  return arr;
};

function postComments(state = [], action) {
  switch (action.type) {
    case GET:
      return action.comments;
    case ADD:
      return [...state, action.comment];
    case ADDREP:
      return addToTree(state, action.reply);
    default:
      return state;
  }
}

export default postComments;
