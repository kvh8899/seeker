import { useState, useEffect } from "react";

function MidNav() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);
  useEffect(() => {
    function close() {
      setSearch(false);
    }
    document.body.addEventListener("click", close);
    return () => {
      document.body.removeEventListener("click", close);
    };
  });
  return (
    <div className="midNav">
      <input
        placeholder="Search for Communities"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSearch(true);
        }}
      ></input>
      {search && <div className="dropResult"></div>}
    </div>
  );
}

export default MidNav;
