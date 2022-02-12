import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setMap } from "../../store/commentsMap";
import { replyTo } from "../../store/comments";
import { useState } from "react";
import { hide } from "../utils";
const UserData = styled.div`
  width: 100%;
`;
function ReplyForm({ e, rep, pp, levels }) {
  const dispatch = useDispatch();
  const [reply, setReply] = useState("");
  const currentPost = useSelector((state) => state.currentPost);
  return (
    <div id={"repinput" + e.id} className="displayNun" ref={rep}>
      {levels()}
      <UserData>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        ></div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            className="tab"
            id={`tab${e.id}`}
            onClick={(ex) => {
              dispatch(setMap(`com${e.id}`));
              hide(e);
              document
                .querySelector(`.comTop${e.id}`)
                .classList.remove("noThread");
              document
                .querySelector(`#bcom${e.id}`)
                .classList.remove("noThread");
              pp.current.classList.add("move");
            }}
          ></div>
          <form
            id={`com${e.id}`}
            style={{ position: "relative" }}
            onSubmit={async (event) => {
              event.preventDefault();
              const repl = await dispatch(
                replyTo(e.id, {
                  content: reply,
                  post_id: currentPost.id,
                })
              );
              localStorage.setItem(`com${repl.id}`, true);
              if (rep.current) {
                rep.current.classList.toggle("displayNun");
                rep.current.classList.toggle("reply");
                setReply("");
              }
            }}
          >
            <textarea
              value={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
              style={{
                marginTop: "10px",
                width: "100%",
                position: "relative",
              }}
            ></textarea>
            <div className="repButton">
              <button
                className="repcanc"
                onClick={(e) => {
                  rep.current.classList.toggle("displayNun");
                  rep.current.classList.toggle("reply");
                }}
                type="reset"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="repsub"
                disabled={reply.search(/[\w\d!@#$%^&*()]/) > -1 ? false : true}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </UserData>
    </div>
  );
}

export default ReplyForm;
