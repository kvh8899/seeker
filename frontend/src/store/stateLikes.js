const GETUSERLIKES = "set/GETsUSERLIKES";
const ADDUSERLIKE = "set/ADDsUSERLIKE";
const DELETEUSERLIKE = "set/DELETEsUSERLIKE";

export const getSLikes = (likes) => {
  return {
    type: GETUSERLIKES,
    likes,
  };
};

export const addSLike = (like) => {
  return {
    type: ADDUSERLIKE,
    like,
  };
};

export const delSLike = (like) => {
  return {
    type: DELETEUSERLIKE,
    like,
  };
};


function stateLikes(state = [], action) {
  switch (action.type) {
    case GETUSERLIKES:
      return action.likes;
    case ADDUSERLIKE:
      return [...state, action.like];
    case DELETEUSERLIKE:
      return state.map((e) => {
        if (e === action.like) return 0;
        return e;
      });
    default:
      return state;
  }
}


export default stateLikes;
