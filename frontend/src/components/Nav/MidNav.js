import { useState, useEffect } from "react";

function MidNav() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
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
