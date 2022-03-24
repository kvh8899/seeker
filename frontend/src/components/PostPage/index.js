import "./postpage.css";
import { togglePostPage } from "../../store/toggles";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPost } from "../../store/currentPost";
import PostContent from "./postcontent";
import { useEffect } from "react";

function PostPage() {
  const dispatch = useDispatch();
  const currentPost = useSelector((state) => state.currentPost);
  useEffect(() => {
    return async () => {
      await dispatch(getCurrentPost(null));
    };
  }, []);
  return (
    <>
      <div
        className="postPageb"
        onClick={async (e) => {
          dispatch(togglePostPage());
          document.body.classList.remove("mainContentScroll");
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
                  document.body.classList.remove("mainContentScroll");
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
