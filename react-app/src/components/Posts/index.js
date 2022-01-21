import { useSelector } from "react-redux";
import "./posts.css";
function Posts() {
  const postList = useSelector((state) => state.postList);
  return (
    <>
      {postList.map((e) => {
        return (
          <div key={e.id}>
            <div className="ipContent">
              <div className="lSidebar">
                <i className="far fa-thumbs-up"></i>
                <p>{e.likers.length}</p>
                {/* <i class="fas fa-thumbs-up"></i>*/}
              </div>
            </div>
            <div className="postHeadings">
              <div className="postBel">
                <img src={e.page.profile_image} alt=""></img>
                <p className="pageMeta">{e.page.title}</p>
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
