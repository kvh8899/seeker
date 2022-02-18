import { useState, useEffect, useRef } from "react";
import { getPagesByQuery, clearPages } from "../../store/searchPages";
import { useDispatch, useSelector } from "react-redux";
import Load from "../loadingAnimations/Load";
import { memo } from "react";
function MidNav() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const searchPages = useSelector((state) => state.searchPages);
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
    <div className="midNav">
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
            searchPages?.search?.length ? (
              <div className="searchResults">
                <div>
                  {searchPages?.search?.map((e) => (
                    <div>{e.title}</div>
                  ))}
                </div>
              </div>
            ) : (
              "No Matches"
            )
          ) : query ? (
            <Load />
          ) : (
            "Search Communities"
          )}
        </div>
      )}
    </div>
  );
}

export default memo(MidNav);
