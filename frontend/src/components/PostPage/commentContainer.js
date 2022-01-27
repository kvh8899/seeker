import styled from "styled-components";
import { replyTo } from "../../store/comments";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
const ProfImage = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  margin-right: 5px;
  object-fit: cover;
`;
const CContent = styled.div`
  display: flex;
  width: 100%;
`;

const Text = styled.div`
  display: flex;
  margin-top: 6px;
  min-height: 50px;
`;
const UserData = styled.div`
  width: 100%;
`;

function CommentContainer({ level, e, path }) {
  const currentPost = useSelector((state) => state.currentPost);
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  const rep = useRef([]);
  function levels() {
    let arr = [];
    for (let x = 0; x < level; x++) {
      arr.push(
        <div
          className="tab greyTab"
          key={x}
          id={`tab${path[level - x - 1]}`}
        ></div>
      );
    }
    return arr;
  }
  useEffect(() => {
    let allTab = document.querySelectorAll(`#tab${e.id}`);
    function tabHover() {
      allTab.forEach((e) => {
        e.classList.add("orangeTab");
        e.classList.remove("greyTab");
      });
    }
    function tabLeave(){
        allTab.forEach((e) => {
            e.classList.remove("orangeTab");
            e.classList.add("greyTab");
          });  
    }
    allTab.forEach((e) => {
      e.addEventListener("mouseover", tabHover);
      e.addEventListener("mouseleave", tabLeave);
    });
    return () => {
      allTab.forEach((e) => {
        e.removeEventListener("mouseover", tabHover);
      });
    };
  });

  return (
    <div key={e.id}>
      <div>
        <CContent>
          {levels()}
          <UserData>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <ProfImage src={"/Guardian.png"} alt=""></ProfImage>
              <div>{e?.owner?.username}</div>
            </div>
            <Text>
              <div className="thread greyTab" id={`tab${e.id}`}></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {e?.content}
                <button
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: "0px",
                    marginTop: "10px",
                    paddingLeft: "0px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "lightcoral",
                    fontWeight: "bold",
                  }}
                  onClick={(e) => {
                    rep.current.classList.toggle("displayNun");
                    rep.current.classList.toggle("reply");
                  }}
                >
                  Reply
                </button>
              </div>
            </Text>
          </UserData>
        </CContent>
        <div id={"repinput" + e?.id} className="displayNun" ref={rep}>
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
                marginLeft: "13px",
                minHeight: "50px",
              }}
            >
              <div className="tab" id={`tab${e.id}`}></div>
              <form
                style={{ position: "relative" }}
                onSubmit={(event) => {
                  event.preventDefault();
                  dispatch(
                    replyTo(e.id, {
                      content: reply,
                      post_id: currentPost.id,
                    })
                  );
                  rep.current.classList.toggle("displayNun");
                  rep.current.classList.toggle("reply");
                  setReply("");
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
                  <button type="submit" className="repsub">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </UserData>
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;
