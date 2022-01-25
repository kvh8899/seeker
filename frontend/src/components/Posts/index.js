import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { togglePostPage, toggleLogin } from "../../store/toggles";
import { getCurrentPost } from "../../store/currentPost";
import { useEffect, useRef } from "react";
import { getPostLikes, addPostLikes, delPostLikes } from "../../store/likes";

import ReactMarkdown from "react-markdown";
import "./posts.css";

function Posts() {
  const postList = useSelector((state) => state.postList);
  const currentPost = useSelector((state) => state.currentPost);
  const postLikes = useSelector((state) => state.postLikes);
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const hist = useHistory();

  async function loadData() {
    for (let i = 0; i < postList.length; i++) {
      await dispatch(getPostLikes(postList));
    }
  }
  useEffect(() => {
    loadData();
  }, [postList, currentPost, session]);

  return (
    <>
    
      {postList.length ? "" : "Be the first to make a post!"}
      {postList.map((e, i) => {
        return (
          <div
            key={e.id}
            className="mainPosts"
            onClick={() => {
              dispatch(togglePostPage());
              dispatch(getCurrentPost(e.id));
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
                    if (!(postLikes.indexOf(e.id) > -1)) {
                      await dispatch(addPostLikes(e.id));
                      ref.innerText = parseInt(ref.innerText) + 1;
                    } else {
                      await dispatch(delPostLikes(e.id));
                      ref.innerText = parseInt(ref.innerText) - 1;
                    }
                  }}
                >
                  {postLikes.indexOf(e.id) > -1 ? (
                    <i className="fas fa-thumbs-up"></i>
                  ) : (
                    <i className="far fa-thumbs-up"></i>
                  )}
                </div>
                <p id={`like${e.id}`}>
                  {e.likers?.length}
                </p>
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
                </div>
              </div>
              <div className="mainData">
                <h4>{e.heading}</h4>
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

export default Posts;
