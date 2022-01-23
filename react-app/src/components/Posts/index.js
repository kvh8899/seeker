import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { togglePostPage } from "../../store/toggles";
import { getCurrentPost } from "../../store/currentPost";
import "./posts.css";

function Posts() {
  const postList = useSelector((state) => state.postList);
  const dispatch = useDispatch();
  const hist = useHistory();
  return (
    <>
      {postList.length ? "" : "Be the first to make a post!"}
      {postList.map((e) => {
        return (
          <div
            key={e.id}
            onClick={() => {
              dispatch(togglePostPage());
              dispatch(getCurrentPost(e.id))
            }}
          >
            <div className="ipContent">
              <div className="lSidebar">
                <i className="far fa-thumbs-up"></i>
                <p>{e.likers.length}</p>
                {/* <i class="fas fa-thumbs-up"></i>*/}
              </div>
            </div>
            <div className="postHeadings">
              <div className="postBel">
                <img
                  src={e.page.profile_image}
                  alt=""
                  id={e.page_id}
                  onClick={(e) => {
                    e.stopPropagation();
                    hist.push(`/pages/${e.target.id}`);
                  }}
                ></img>
                <p
                  className="pageMeta"
                  id={e.page_id}
                  onClick={(e) => {
                    e.stopPropagation();
                    hist.push(`/pages/${e.target.id}`);
                  }}
                >
                  {e.page.title}
                </p>
                <div className="posterMeta">
                  <i className="fas fa-circle"></i>
                  <p>Posted by</p>
                  <p>{e.owner.username}</p>
                </div>
              </div>
              <div className="mainData">
                <h4>{e.heading}</h4>
                <p>{e.content}</p>
                <div className="commentData">
                  <div className="cDiv">
                    <div>
                      <i className="far fa-comment-alt"></i>
                      <p></p>
                      <p>{e.comments} Comments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Posts;
