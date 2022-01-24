import { togglePostPage } from "../../store/toggles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PageData from "./PageData";
import { like, deleteLike, addLike, getLikes } from "../utils";
import { useEffect, useState, useRef } from "react";

function PostContent() {
  const dispatch = useDispatch();
  const hist = useHistory();
  const currentPost = useSelector((state) => state.currentPost);
  const [isLike, setIsLike] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const likeNum = useRef(null);
  async function loadData() {
    const x = await like(currentPost.id);
    const y = await getLikes(currentPost.id);
    setIsLike(x);
    setNumLikes(y);
  }

  useEffect(() => {
    if (currentPost.id) loadData();
  }, [currentPost]);

  return (
    <div className="spostContent">
      <div className="postContent">
        <div id="pcdiv">
          <div id="pcdiv" className="ipContent">
            <div className="lSidebar">
              <div
                onClick={async (e) => {
                  if (isLike) {
                    likeNum.current.innerText =
                      parseInt(likeNum.current.innerText) - 1;
                    await deleteLike(currentPost.id);
                  } else {
                    likeNum.current.innerText =
                      parseInt(likeNum.current.innerText) + 1;
                    await addLike(currentPost.id);
                  }
                  setIsLike(!isLike);
                }}
              >
                {isLike ? (
                  <i className="fas fa-thumbs-up"></i>
                ) : (
                  <i className="far fa-thumbs-up"></i>
                )}
              </div>

              <p ref={likeNum}>{numLikes}</p>
              {/* <i class="fas fa-thumbs-up"></i>*/}
            </div>
          </div>
          <div className="postHeadings">
            <div className="postBel">
              <img
                src={
                  currentPost.page?.profile_image
                    ? currentPost.page?.profile_image
                    : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                }
                id={currentPost.page?.id}
                alt=""
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(togglePostPage());
                  hist.push(`/pages/${e.target.id}`);
                }}
              ></img>
              <p
                className="pageMeta"
                id={currentPost.page?.id}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(togglePostPage());
                  hist.push(`/pages/${e.target.id}`);
                }}
              >
                {currentPost.page?.title}
              </p>
              <div className="posterMeta">
                <i className="fas fa-circle"></i>
                <p>Posted by</p>
                <p>{currentPost.owner?.username}</p>
              </div>
            </div>
            <div className="pageMC">
              <h4>{currentPost.heading}</h4>
              <ReactMarkdown>{currentPost.content}</ReactMarkdown>
              <div>
                <div className="cDiv">
                  <div>
                    <i className="far fa-comment-alt"></i>
                    <p>{currentPost.comments}</p>
                    <p>Comments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sideBar">
        <PageData />
      </div>
    </div>
  );
}

export default PostContent;
