const GET = "current/GET";

const getPage = (page) => {
  return {
    type: GET,
    page,
  };
};

export const getCurrentPage = (id) => async (dispatch) => {
  const res = await fetch(`/api/pages/${id}`);

  if (res.ok) {
    const page = await res.json();
    dispatch(getPage(page));
    return page;
  } else {
    return null;
  }
};

function currentPage(state = {}, action) {
  switch (action.type) {
    case GET:
      return action.page;
    default:
      return state;
  }
}

export default currentPage;
