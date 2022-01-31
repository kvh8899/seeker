import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentPost } from "../../store/currentPost";
import { deleteOnePost } from "../../store/posts";
import { editCurrentPost } from "../../store/currentPost";
import { togglePostPage } from "../../store/toggles";

function EpForm() {
  const currentPost = useSelector((state) => state.currentPost);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [contentImage, setContentImage] = useState("");
  const dispatch = useDispatch();
  const hist = useHistory();
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  async function loadData() {
    const post = await dispatch(getCurrentPost(id));
    if (post) {
      setHeading(post.heading);
      setContent(post.content);
      setContentImage(post.contentImage ? post.contentImage : "");
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <div className="createPForm" style={{ minHeight: "600px" }}>
      <form
        id="editPostForm"
        onSubmit={async (e) => {
          e.preventDefault();
          const post = { heading, content, contentImage };
          const errors = await dispatch(editCurrentPost(post, currentPost.id));
          console.log(errors);
          if (!errors.length) {
            document.body.classList.add("mainContentScroll");
            dispatch(togglePostPage());
            hist.push(`/`);
          } else {
            setErrors(errors);
          }
        }}
      >
        <input
          placeholder="Title"
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
          }}
          required
        ></input>
        <input
          placeholder="Image (optional)"
          value={contentImage}
          onChange={(e) => {
            setContentImage(e.target.value);
          }}
        ></input>
        <p>Markdown</p>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </form>
      <div
        style={{
          dispay: "flex",
          flexDirection: "column",
          position: "relative",
          top: "50px",
          color: "red",
        }}
      >
        {errors.map((e, i) => {
          return <p key={i}>{e} must not be empty</p>;
        })}
      </div>
      <div>
        <div className="epfbuttons" style={{ left: "0", bottom: "-50px" }}>
          <button
            className="delete"
            onClick={async (e) => {
              //dispatch(toggleEditPage());
              await dispatch(deleteOnePost(currentPost.id));
              alert("Post Deleted");
              hist.push("/");
            }}
          >
            DELETE
          </button>
          <div>
            <button
              className="cancel"
              onClick={(e) => {
                hist.push("/");
              }}
            >
              Cancel
            </button>
            <button className="submit" form="editPostForm">
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpForm;
