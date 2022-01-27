const ADD = "map/ADD";
const SET = "map/SET";

export const addMap = (payload, value) => {
  return {
    type: ADD,
    payload,
    value,
  };
};

export const setMap = (payload) => {
  return {
    type: SET,
    payload,
  };
};

function commentsMap(state = null, action) {
  let newMap;
  switch (action.type) {
    case ADD:
      newMap = { ...state };
      newMap[`${action.payload}`] = action.value;
      return newMap;
    case SET:
      newMap = { ...state };
      newMap[`${action.payload}`] = false;
      return newMap;
    default:
      return state;
  }
}

export default commentsMap;
