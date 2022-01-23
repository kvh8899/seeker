import "./postpage.css";
import { togglePostPage } from "../../store/toggles";
import { useDispatch } from "react-redux";

function PostPage() {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="postPageb"
        onClick={(e) => {
          dispatch(togglePostPage());
        }}
      >
        <div
          className="mainPostContainer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="space1">dsad</div>
          <div className="mainPostContent">
            <div className="titleBar">
              <button
                onClick={(e) => {
                  dispatch(togglePostPage());
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;
