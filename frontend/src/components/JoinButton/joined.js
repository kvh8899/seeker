import { UnFollow } from "../../store/checkFollow";
import { useDispatch } from "react-redux";
import { fetchUserList } from "../../store/pages";
function Joined({ cp, sessionId }) {
  const dispatch = useDispatch();
  return (
    <button
      id="joined"
      className={`${cp}`}
      style={{
        backgroundColor: "rgb(25, 159, 221)",
        color: "white",
        border: "none",
      }}
      onClick={async (e) => {
        await dispatch(UnFollow(cp));
        await dispatch(fetchUserList(sessionId));
      }}
      onMouseOver={(e) => {
        e.target.innerText = "Unsubscribe";
        e.target.style.backgroundColor = "#CC5500";
      }}
      onMouseLeave={(e) => {
        e.target.innerText = "Joined";
        e.target.style.backgroundColor = "rgb(25, 159, 221)";
      }}
    >
      Joined
    </button>
  );
}

export default Joined;
