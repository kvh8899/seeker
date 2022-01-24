import { useSelector, useDispatch } from "react-redux";
import { cap, extractDate } from "../utils";
function PageData() {
  const currentPost = useSelector((state) => state.currentPost);
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
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
            <i className="fas fa-birthday-cake"></i> Created{" "}
            {currentPost.page?.created_at &&
              extractDate(currentPost.page?.created_at)}
          </p>
          <p>{currentPost.page?.description}</p>
        </div>
        <div className="crd">
          <button onClick={(e) => {}}>Create Post</button>
          {session?.id === currentPost.owner_id && (
            <button
              onClick={(e) => {
                //dispatch(toggleEditPage());
              }}
            >
              Edit Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageData;
