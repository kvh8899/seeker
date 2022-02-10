import { useState, useEffect } from "react";
import { getPagesByQuery } from "../../store/searchPages";
import { useDispatch, useSelector } from "react-redux";
function MidNav() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const searchPages = useSelector((state) => state.searchPages);
  useEffect(() => {
    let close = () => setSearch(false);
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
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setSearch(true);
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
        }}
      ></input>
      {search && <div className="dropResult"></div>}
    </div>
  );
}

export default MidNav;
