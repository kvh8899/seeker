import "./postpage.css";
import { togglePostPage } from "../../store/toggles";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPost } from "../../store/currentPost";
import PostContent from "./postcontent";

function PostPage() {
  const dispatch = useDispatch();
  const currentPost = useSelector((state) => state.currentPost);
  return (
    <>
      <div
        className="postPageb"
        onClick={async(e) => {
          dispatch(togglePostPage());
          await dispatch(getCurrentPost(null));
          document.body.classList.remove("mainContentScroll")
        }}
      >
        <div
          className="mainPostContainer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="space1"></div>
          <div className="mainPostContent">
            <div className="titleBar">
              <p>{currentPost.heading}</p>
              <button
                onClick={(e) => {
                  dispatch(togglePostPage());
                }}
              >
                <i className="fas fa-times"></i> Close
              </button>
            </div>
            <PostContent />
            <span id="spacer"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;
