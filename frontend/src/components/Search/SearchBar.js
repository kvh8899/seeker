import { getPagesByQuery, clearPages } from "../../store/searchPages";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import BlankSearch from "../loadingAnimations/BlankSearch";
import SearchResults from "./SearchResults";
function SearchBar() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  useEffect(() => {
    let close = () => {
      searchInput.current.blur();
      setSearch(false);
    };
    document.body.addEventListener("mouseup", close);
    return () => {
      document.body.removeEventListener("mouseup", close);
    };
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (query) {
        //dispatch
        dispatch(getPagesByQuery(query));
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }, 600);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <>
      <input
        placeholder="Search for Communities"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          dispatch(clearPages());
          setLoading(true);
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setSearch(true);
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
        }}
        ref={searchInput}
      ></input>
      {search && (
        <div
          className="dropResult"
          onMouseUp={(e) => {
            e.stopPropagation();
          }}
        >
          {!isLoading ? (
            <SearchResults />
          ) : query ? (
            <BlankSearch num={6} />
          ) : (
            <div className="search-placeholder">
              <p>Type keywords to get search results!</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchBar;
