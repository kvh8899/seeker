const SEARCHBYPAGE = "search/PAGES";

const dispatchPages = (pages) => {
  return {
    type: SEARCHBYPAGE,
    pages,
  };
};

export const getPagesByQuery = (query) => async () => {
  const res = await fetch(`/api/search/pages/${query}`);

  if (res.ok) {
    const pages = await res.json();
    dispatchEvent(dispatchPages(pages));
  } else if (res.status < 500) {
    return null;
  }

};

function searchPages(state = [], action) {
  switch (action.type) {
    case SEARCHBYPAGE:
      return action.pages;
    default:
      return state;
  }
}

export default searchPages;
