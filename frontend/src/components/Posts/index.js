import { useSelector, useDispatch } from "react-redux";
import { useEffect, memo } from "react";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { addPostLikes, delPostLikes } from "../../store/likes";
import { addSLike, delSLike } from "../../store/stateLikes";
import { togglePostPage, toggleLogin } from "../../store/toggles";
import { getCurrentPost } from "../../store/currentPost";
import { getAllComments } from "../../store/comments";
import { formatDate } from "../utils";
import "./posts.css";
function Posts() {
  const postList = useSelector((state) => state.postList);
  const stateLikes = useSelector((state) => state.stateLikes);
  const session = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const hist = useHistory();
  
  useEffect(() => {
    let keys = Object.keys(localStorage);
    keys.forEach((e) => {
      if (e.startsWith("com")) localStorage.setItem(e, true);
    });
  }, []);

  return <>
      {postList.length ? "" : "No Posts yet!"}
      {postList.map((e, i) => {
        return (
          <div
            key={e.id}
            className="mainPosts"
            onClick={async () => {
              await dispatch(getCurrentPost(e.id));
              await dispatch(getAllComments(e.id));
              dispatch(togglePostPage());
              document.body.classList.add("mainContentScroll");
            }}
            onMouseOver={(e) => {
              e.currentTarget.classList.add("borderOn");
              e.currentTarget.classList.remove("mainPosts");
            }}
            onMouseLeave={(e) => {
              e.currentTarget.classList.remove("borderOn");
              e.currentTarget.classList.add("mainPosts");
            }}
          >
            <div className="ipContent">
              <div className="lSidebar">
                <div
                  onClick={async (ex) => {
                    ex.stopPropagation();
                    if (!session) {
                      dispatch(toggleLogin());
                      return;
                    }
                    let ref = document.querySelector(`#like${e.id}`);
                    if (!(stateLikes.indexOf(e.id) > -1)) {
                      dispatch(addSLike(e.id));
                      ref.innerText = parseInt(ref.innerText) + 1;
                      await dispatch(addPostLikes(e.id));
                    } else {
                      dispatch(delSLike(e.id));
                      ref.innerText = parseInt(ref.innerText) - 1;
                      await dispatch(delPostLikes(e.id));
                    }
                  }}
                >
                  {stateLikes.indexOf(e.id) > -1 ? (
                    <i
                      className="fas fa-thumbs-up"
                      style={{ color: "#ff7400" }}
                      id={`l${e.id}`}
                    ></i>
                  ) : (
                    <i
                      id={`l${e.id}`}
                      className="far fa-thumbs-up"
                      onMouseOver={(e) => {
                        e.target.style.color = "#ff7400";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "black";
                      }}
                    ></i>
                  )}
                </div>
                <p id={`like${e.id}`}>{e.likers?.length}</p>
              </div>
            </div>
            <div className="postHeadings">
              <div className="postBel">
                <img
                  src={
                    e.page?.profile_image
                      ? e.page?.profile_image
                      : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                  }
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
                  {e.page?.title}
                </p>
                <div className="posterMeta">
                  <i className="fas fa-circle"></i>
                  <p>Posted by</p>
                  <p>{e.owner?.username}</p>
                  <p>{formatDate(e.created_at)}</p>
                </div>
              </div>
              <div className="mainData">
                <h3>{e.heading}</h3>
                <ReactMarkdown>{e.content}</ReactMarkdown>
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
}

export default memo(Posts);
