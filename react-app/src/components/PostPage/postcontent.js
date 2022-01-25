import { togglePostPage, toggleLogin } from "../../store/toggles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PageData from "./PageData";
import { useEffect, useState, useRef } from "react";
import { addPostLikes, delPostLikes } from "../../store/likes";
function PostContent() {
  const dispatch = useDispatch();
  const hist = useHistory();
  const currentPost = useSelector((state) => state.currentPost);
  const postLikes = useSelector((state) => state.postLikes);
  const session = useSelector((state) => state.session.user);
  const [numLikes, setNumLikes] = useState(0);
  async function loadData() {
    const res = await fetch(`/api/likes/${currentPost.id}`);

    if (res.ok) {
      const { likes } = await res.json();
      setNumLikes(likes);
    }
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
                  if (!session) {
                    dispatch(toggleLogin());
                    return;
                  }
                  let ref = document.querySelectorAll(`#like${currentPost.id}`);
                  if (postLikes.indexOf(currentPost.id) > -1) {
                    await dispatch(delPostLikes(currentPost.id));
                    ref.forEach((e) => {
                      e.innerText = parseInt(e.innerText) - 1;
                    });
                  } else {
                    await dispatch(addPostLikes(currentPost.id));
                    ref.forEach((e) => {
                      e.innerText = parseInt(e.innerText) + 1;
                    });
                  }
                }}
              >
                {postLikes.indexOf(currentPost.id) > -1 ? (
                  <i className="fas fa-thumbs-up"></i>
                ) : (
                  <i className="far fa-thumbs-up"></i>
                )}
              </div>

              <p id={`like${currentPost.id}`}>
                {numLikes}
              </p>
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
