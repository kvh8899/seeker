import { useSelector } from "react-redux";
import "./search.css";
function SearchResults() {
  const searchPages = useSelector((state) => state.searchPages);
  return searchPages?.search?.length ? (
    <div className="searchResults">
      <div>
        {searchPages?.search?.map((e) => (
          <div key={e.id} className="search-posts">
            <div className="page-data">
              <img
                src={e.profile_image}
                width="30px"
                height="30px"
                alt="profile"
              ></img>
              <p>{e.title}</p>
            </div>
            <div>
              <p>{e.follows} followers</p>
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
