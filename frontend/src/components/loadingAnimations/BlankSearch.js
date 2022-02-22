import "./BlankSearch.css";
import { createDiv } from "./LoadUtils";

function BlankSearch({ num }) {
  return <div className="fake-result">{createDiv(num)}</div>;
}

export default BlankSearch;
