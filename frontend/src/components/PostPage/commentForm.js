import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneComment } from "../../store/comments";
import { toggleLogin } from "../../store/toggles";
function CommentForm() {
  const [comment, setComment] = useState("");
  const currentPost = useSelector((state) => state.currentPost);
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!session) {
          dispatch(toggleLogin());
          return;
        }
        await dispatch(addOneComment(currentPost.id, { content: comment }));
        setComment("");
      }}
      style={{
        position: "sticky",
        bottom: "50px",
        minHeight: "50px",
        width: "703px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0px 3px 10px 1px lightgray",
          width: "95%",
          alignSelf: "center",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <input
          style={{
            borderRadius: "25px",
            width: "90%",
            padding: "10px",
            marginRight: "20px",
            marginTop: "10px",
          }}
          placeholder="Add a Comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        ></input>

        <button
          style={{
            borderRadius: "25px",
            backgroundColor: "#ff9230",
            border: "none",
            padding: "5px 15px",
            color: "white",
            fontWeight: "bold",
            marginBottom: "9px",
            marginRight: "20px",
          }}
          disabled={comment.length ? false : true}
        >
          Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
