import { useSelector } from "react-redux";
import { toggleEditPage, toggleLogin } from "../../store/toggles";
import { cap, extractDate } from "../utils";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./comdata.css";
function ComData() {
  const currentPage = useSelector((state) => state.currentPage);
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const hist = useHistory();

  return (
    <div className="comSideBar">
      <div className="aboutHeader">
        <p>About Community</p>
      </div>
      <div className="aboutData">
        <div>
          <p>Welcome to {currentPage.title}</p>
          <div className="mc">
            <p>{currentPage.subscribers} </p>
            <p className="fn">{cap(currentPage.followers_type)}</p>
          </div>
        </div>
        <span></span>
        <div className="bd">
          <p>
            <i className="fas fa-birthday-cake"></i> Created{" "}
            {currentPage.created_at && extractDate(currentPage.created_at)}
          </p>
          <p>{currentPage.description}</p>
        </div>
        <div className="crd">
          <button
            onClick={(e) => {
              if (session) {
                hist.push("/posts/submit");
              } else {
                dispatch(toggleLogin());
              }
            }}
          >
            Create Post
          </button>
          {session?.id === currentPage.owner_id && (
            <button
              onClick={(e) => {
                dispatch(toggleEditPage());
              }}
            >
              Edit Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComData;
