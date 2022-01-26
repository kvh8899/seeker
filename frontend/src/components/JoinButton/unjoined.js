import { Follow } from "../../store/checkFollow";
import { useDispatch } from "react-redux";
import { fetchUserList } from "../../store/pages";
import { toggleLogin } from "../../store/toggles";
function Unjoined({ cp, sessionId }) {
  const dispatch = useDispatch();
  return (
    <button
      id="join"
      className={`${cp}`}
      onClick={async (e) => {
        if (sessionId) {
          await dispatch(Follow(cp));
          await dispatch(fetchUserList(sessionId));
        } else {
          dispatch(toggleLogin());
        }
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "rgb(25, 159, 221)";
        e.target.style.border = "none";
        e.target.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.border = "1px solid black";
        e.target.style.color = "black";
      }}
    >
      Join
    </button>
  );
}

export default Unjoined;
