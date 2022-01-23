import { useState } from "react";
import { addOnePost } from "../../store/posts";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
function CpForm({ currPage, currId, setErrors }) {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [contentImage, setContentImage] = useState("");
  const dispatch = useDispatch();
  const hist = useHistory();
  return (
    <div className="createPForm">
      <form
        id="postcreate"
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(currPage)
          if (!currPage) {
            setErrors(["Please Select a Community"]);
            return;
          }
          const post = { heading, content, contentImage };
          await dispatch(addOnePost(currId, post));
          hist.push(`/pages/${currId}`);
        }}
      >
        <input
          placeholder="Title"
          value={heading}
          onChange={(e) => {
            setHeading(e.target.value);
          }}
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
      <div>
        <button className="submit" form="postcreate">
          Post
        </button>
      </div>
    </div>
  );
}

export default CpForm;
