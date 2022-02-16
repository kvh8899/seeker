import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { togglePostPage, toggleLogin } from "../../store/toggles";
import { getCurrentPost } from "../../store/currentPost";
import { useEffect, useState } from "react";
import { getPostLikes, addPostLikes, delPostLikes } from "../../store/likes";
import { getAllComments } from "../../store/comments";
import ReactMarkdown from "react-markdown";
import { getAllPosts, getFollowPosts } from "../../store/posts";
import { formatDate } from "../utils";
import "./posts.css";
import Load from "../loadingAnimations/Load";
import { memo } from "react";
import { addSLike, getSLikes, delSLike } from "../../store/stateLikes";
function Posts({ name }) {
  const postList = useSelector((state) => state.postList);
  const session = useSelector((state) => state.session.user);
  const stateLikes = useSelector((state) => state.stateLikes);
  const dispatch = useDispatch();
  const hist = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  async function loadData(posts) {
    if (session && !stateLikes.length) {
      const postLikes = await dispatch(getPostLikes(posts));
      dispatch(getSLikes(postLikes));
    }
  }
  async function loadAll() {
    const posts = await dispatch(getAllPosts());
    loadData(posts);
    setIsLoading(false);
  }
  async function loadFollowed() {
    const posts = await dispatch(getFollowPosts());
    loadData(posts);
    setIsLoading(false);
  }
  useEffect(() => {
    let keys = Object.keys(localStorage);
    keys.forEach((e) => {
      if (e.startsWith("com")) localStorage.setItem(e, true);
    });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (!session || name === "All") {
      loadAll();
    } else {
      loadFollowed();
    }
  }, [session]);

  return isLoading ? (
    <Load />
  ) : (
    <>
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
  );
}

export default memo(Posts);
