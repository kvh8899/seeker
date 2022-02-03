import { useSelector, useDispatch } from "react-redux";
import { cap, extractDate } from "../utils";
import { useHistory } from "react-router-dom";
import { togglePostPage } from "../../store/toggles";
import JoinButton from "../JoinButton";
function PageData() {
  const currentPost = useSelector((state) => state.currentPost);
  const session = useSelector((state) => state.session.user);
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
  const hist = useHistory();
  return (
    <div className="comSideBar">
      <div className="aboutHeader">
        <p>About Community</p>
      </div>
      <div className="aboutData">
        <div>
          <p>Welcome to {currentPost.page?.title}</p>
          <div className="mc">
            <p>{currentPost.page?.subscribers} </p>
            <p className="fn">{cap(currentPost.page?.followers_type)}</p>
          </div>
        </div>
        <span></span>
        <div className="bd">
          <p>
            <i className="fas fa-birthday-cake"></i> Created {currentPost.page?.created_at &&
              extractDate(currentPost.page?.created_at)}
          </p>
          <p>{currentPost.page?.description}</p>
        </div>
        <div id="postPageJoin" className="crd">
          <JoinButton cp={currentPost.page?.id} sessionId={session.id} />
        </div>
      </div>
    </div>
  );
}

export default PageData;
