import SearchBar from "../Search/SearchBar";
import { memo } from "react";
function MidNav() {
  return (
    <div className="midNav">
      <SearchBar />
    </div>
  );
}

export default memo(MidNav);
