//action types
const GET = "current/GET";
const EDIT = "current/EDIT";
const CLEAR = "current/CLEAR";
const getPage = (page) => {
  return {
    type: GET,
    page,
  };
};
const clear = () => {
  return {
    type: CLEAR,
  };
};

const editPage = (page) => {
  return {
    type: EDIT,
    page,
  };
};

export const getCurrentPage = (id) => async (dispatch) => {
  if (!id) {
    dispatch(clear());
    return;
  }
  const res = await fetch(`/api/pages/${id}`);

  if (res.ok) {
    const page = await res.json();
    dispatch(getPage(page));
    return page;
  } else {
    return null;
  }
};

export const editCurrentPage = (id, data) => async (dispatch) => {
  const res = await fetch(`/api/pages/${id}/edit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const page = await res.json();
    dispatch(editPage(page));
    return page;
  } else if (res.status < 500) {
    const { errors } = await res.json();
    return errors;
  }
};

function currentPage(state = {}, action) {
  switch (action.type) {
    case GET:
      return action.page;
    case EDIT:
      return action.page;
    case CLEAR:
      return {};
    default:
      return state;
  }
}

export default currentPage;
