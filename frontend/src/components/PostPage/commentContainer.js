import styled from "styled-components";
import { replyTo } from "../../store/comments";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { toggleLogin } from "../../store/toggles";
import { setMap } from "../../store/commentsMap";
import {
  findReply,
  getChildren,
  hide,
  reRenderThread,
  hideMany,
} from "../utils";
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
  margin-left: 13px;
  word-break: break-all;
`;
const UserData = styled.div`
  width: 100%;
`;

function CommentContainer({ level, e, path }) {
  const currentPost = useSelector((state) => state.currentPost);
  const postComments = useSelector((state) => state.postComments);
  const map = useSelector((state) => state.commentsMap);
  const session = useSelector((state) => state.session.user);
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  const rep = useRef([]);

  function levels() {
    let arr = [];
    for (let x = 0; x < level; x++) {
      arr.push(
        <div
          className="tab greyTab"
          key={Math.random()}
          id={`tab${path[level - x - 1]}`}
          onClick={(ex) => {
            //find children of id at path[level - x - 1]
            let child = findReply(postComments, parseInt(path[level - x - 1]));
            let children = getChildren(child);
            //set that id in map to false

            dispatch(setMap(`com${path[level - x - 1]}`));
            //hide all of the children (lol)
            children.forEach((exex) => {
              document.querySelectorAll(`#com${exex}`).forEach((e) => {
                e.classList.add("noThread");
              });
            });
            children.forEach((exex) => {
              document.querySelectorAll(`#tab${exex}`).forEach((e) => {
                e.classList.add("noThread");
                e.classList.remove("orangeTab");
                e.classList.add("greyTab");
              });
            });
            document
              .querySelector(`.comTop${path[level - x - 1]}`)
              .classList.remove("noThread");
            document
              .querySelector(`#bcom${path[level - x - 1]}`)
              .classList.remove("noThread");
            document.querySelector(`#com${e.id}`).classList.add("noThread");
          }}
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
    function tabLeave() {
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
        e.removeEventListener("mouseleave", tabLeave);
      });
    };
  }, [levels]);

  useEffect(() => {
    hideMany(e, map);
  }, [postComments]);
  
  return (
    <div key={e.id} id={`com${e.id}`} className={`comTop${e.id}`}>
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
              <button
                className="noThread"
                id={`bcom${e.id}`}
                onClick={(ex) => {
                  //find children of current tree and toggle class noThread of
                  // all childrens unless it is false in map, then stop
                  //set e.id in map to true
                  reRenderThread(e, map);
                  document
                    .querySelector(`#bcom${e.id}`)
                    .classList.add("noThread");
                }}
              >
                <i className="fas fa-expand-alt"></i>
              </button>
              <ProfImage src={"/Guardian.png"} alt=""></ProfImage>
              <div>{e.owner?.username}</div>
            </div>
            <Text>
              <div
                className="thread greyTab"
                id={`tab${e.id}`}
                onClick={(ex) => {
                  hide(e);
                  dispatch(setMap(`com${e.id}`));
                  document
                    .querySelector(`.comTop${e.id}`)
                    .classList.remove("noThread");
                  document
                    .querySelector(`#bcom${e.id}`)
                    .classList.remove("noThread");
                }}
              ></div>
              <div className="ccContent" id={`com${e.id}`}>
                <p style={{ margin: "0px" }}>{e.content}</p>
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
                    if (!session) {
                      dispatch(toggleLogin());
                      return;
                    }
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
                minHeight: "50px",
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
                }}
              ></div>
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
