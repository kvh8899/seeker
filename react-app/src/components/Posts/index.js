import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { togglePostPage } from "../../store/toggles";
import { getCurrentPost } from "../../store/currentPost";
import { useEffect, useState, useRef } from "react";
import { isLike } from "../utils";
import ReactMarkdown from "react-markdown";
import "./posts.css";

function Posts() {
  const session = useSelector((state) => state.session.user);
  const postList = useSelector((state) => state.postList);
  const [likeHover, setLikeHover] = useState([]);
  const likeNum = useRef([]);
  const dispatch = useDispatch();
  const hist = useHistory();
  useEffect(() => {
    setLikeHover(
      session ? postList.map((e) => isLike(e?.likers, session.id)) : []
    );
    likeNum.current = likeNum.current.slice(0, postList.length);
  }, [postList]);

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
                  onClick={(ex) => {
                    ex.stopPropagation();
                    setLikeHover(
                      likeHover.map((e, lH) => {
                        if (i === lH) {
                          if (e) {
                            likeNum.current[i].innerText =
                              parseInt(likeNum.current[i].innerText) - 1;
                          }else{
                            likeNum.current[i].innerText =
                              parseInt(likeNum.current[i].innerText) + 1;  
                          }
                          return !e;
                        }
                        return e;
                      })
                    );
                  }}
                >
                  {likeHover[i] ? (
                    <i className="fas fa-thumbs-up"></i>
                  ) : (
                    <i className="far fa-thumbs-up"></i>
                  )}
                </div>
                <p ref={(e) => (likeNum.current[i] = e)}>{e.likers?.length}</p>
                {/* <i class="fas fa-thumbs-up"></i>*/}
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
