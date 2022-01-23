import { useState } from "react";
function CpForm({ currPage, currId, setErrors }) {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [contentImage, setContentImage] = useState("");
  return (
    <div className="createPForm">
      <form
        id="postcreate"
        onSubmit={(e) => {
          e.preventDefault();
          if (!currPage) {
            setErrors(["Please Select a Community"]);
            return;
          }
          const post = { heading, content, contentImage };
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
