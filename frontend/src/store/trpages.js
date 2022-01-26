const GETTRE = "get/TRENDING";

const trendingPages = (trending) => {
  return {
    type: GETTRE,
    trending,
  };
};
export const getTrending = () => async (dispatch) => {
  const res = await fetch(`/api/pages/trending`);

  if (res.ok) {
    const {pages} = await res.json();
    dispatch(trendingPages(pages));
    return pages;
  }
};

function sideBarPages(state = [], action) {
  switch (action.type) {
    case GETTRE:
      return action.trending;
    default:
      return state;
  }
}

export default sideBarPages;
