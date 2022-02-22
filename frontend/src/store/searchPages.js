const SEARCHBYPAGE = "search/PAGES";
const CLEAR = "search/CLEAR";

const dispatchPages = (pages) => {
  return {
    type: SEARCHBYPAGE,
    pages,
  };
};

export const clearPages = () => {
  return {
    type: CLEAR,
  };
};

export const getPagesByQuery = (query) => async (dispatch) => {
  const res = await fetch(`/api/search/pages/${query}`);

  if (res.ok) {
    const pages = await res.json();
    dispatch(dispatchPages(pages));
  } else if (res.status < 500) {
    return null;
  }
};

function searchPages(state = [], action) {
  switch (action.type) {
    case SEARCHBYPAGE:
      return action.pages;
    case CLEAR:
      return [];
    default:
      return state;
  }
}

export default searchPages;
