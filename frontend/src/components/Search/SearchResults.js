import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./search.css";
function SearchResults({ setSearch }) {
  const searchPages = useSelector((state) => state.searchPages);
  const hist = useHistory();
  return searchPages?.search?.length ? (
    <div className="searchResults">
      <div>
        {searchPages?.search?.map((e) => (
          <div
            key={e.id}
            className="search-posts"
            onMouseDown={(e) => {}}
            onMouseUp={(ex) => {
              setSearch(false);
              hist.push(`/pages/${e.id}`);
            }}
          >
            <div className="page-data">
              <img
                src={e.profile_image}
                width="30px"
                height="30px"
                alt="profile"
              ></img>
            </div>
            <div>
              <p className="search-title">{e.title}</p>
              <p className="follow-data">{e.follows} members</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    "No Matches"
  );
}

export default SearchResults;
