import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { togglePostPage } from "../../store/toggles";
import { getCurrentPost } from "../../store/currentPost";
import { useEffect, useState, useRef } from "react";
import { like, deleteLike, addLike } from "../utils";
import ReactMarkdown from "react-markdown";
import "./posts.css";

function Posts() {
  const postList = useSelector((state) => state.postList);
  const [likes, setLikes] = useState([]);
  const likeNum = useRef([]);
  const dispatch = useDispatch();
  const hist = useHistory();

  async function loadData() {
    let y = [];
    for (let i = 0; i < postList.length; i++) {
      const x = await like(postList[i].id);
      y.push(x);
    }
    setLikes(y);
  }

  useEffect(() => {
    //isLike function should grab liked posts from database
    likeNum.current = likeNum.current.slice(0, postList.length);
    loadData();
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
                  onClick={async (ex) => {
                    ex.stopPropagation();
                    if (likes[i]) {
                      await deleteLike(e.id);
                    } else {
                      await addLike(e.id);
                    }
                    setLikes(
                      likes.map((e, lH) => {
                        if (i === lH) {
                          if (e) {
                            likeNum.current[i].innerText =
                              parseInt(likeNum.current[i].innerText) - 1;
                            //delete like
                          } else {
                            likeNum.current[i].innerText =
                              parseInt(likeNum.current[i].innerText) + 1;
                            //create like
                          }
                          return !e;
                        }
                        return e;
                      })
                    );
                  }}
                >
                  {likes[i] ? (
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
