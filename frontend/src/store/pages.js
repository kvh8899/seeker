//action types
const USERLIST = "set/USERLIST";
const ADDPAGE = "set/ADDPAGE";
const DELETEPAGE = "set/DELETEPAGE";

const addPage = (newPage) => {
  return { type: ADDPAGE, newPage };
};

const delPage = (id) => {
  return {
    type: DELETEPAGE,
    id,
  };
};

const getUserList = (list) => {
  return {
    type: USERLIST,
    list,
  };
};

export const fetchUserList = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}/pages`);

  if (res.ok) {
    let { userPages } = await res.json();
    dispatch(getUserList(userPages));
    return userPages;
  } else {
    return null;
  }
};

export const createPage = (data) => async (dispatch) => {
  const res = await fetch("/api/pages/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    let { page } = await res.json();
    dispatch(addPage(page));
    return page;
  } else {
    return null;
  }
};

export const deletePage = (id) => async (dispatch) => {
  const res = await fetch(`/api/pages/${id}/delete`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(delPage(id));
    return data;
  } else {
    return null;
  }

};

function pageList(state = [], action) {
  switch (action.type) {
    case USERLIST:
      return action.list;
    case ADDPAGE:
      return [...state, action.newPage];
    case DELETEPAGE:
      return state.filter((e) => e.id !== action.id)
    default:
      return state;
  }
}

export default pageList;
