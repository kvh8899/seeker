import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { toggleLogin } from "../../store/toggles";
import { setMap } from "../../store/commentsMap";
import ReplyForm from "./replyForm";
import { toggleClasses, hide, reRenderThread } from "../utils";
import { addMap } from "../../store/commentsMap";
const ProfImage = styled.img`
  position: relative;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  margin-right: 5px;
  object-fit: cover;
  left: "0";
  transitionproperty: "all";
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
const ReplyButton = styled.button`
  align-self: start;
  margin-left: 0px;
  margin-top: 10px;
  padding-left: 0px;
  background-color: transparent;
  border: none;
  color: lightcoral;
  font-weight: bold;
`;

const ProfileContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin-top: 20px;
`;

function CommentContainer({ level, e, path, isOpen }) {
  const postComments = useSelector((state) => state.postComments);
  const map = useSelector((state) => state.commentsMap);
  const session = useSelector((state) => state.session.user);
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
            dispatch(setMap(`com${path[level - x - 1]}`));
            toggleClasses(postComments, path[level - x - 1], e);
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
    dispatch(addMap(`com${e.id}`, isOpen));
  }, [isOpen]);

  return (
    <div id={`com${e.id}`} className={`comTop${e.id}`}>
      <div>
        <CContent>
          {levels()}
          <UserData>
            <ProfileContainer>
              <button
                className="noThread closeButton"
                id={`bcom${e.id}`}
                onClick={(ex) => {
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
            </ProfileContainer>
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
                <ReplyButton
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
                </ReplyButton>
              </div>
            </Text>
          </UserData>
        </CContent>
        <ReplyForm levels={levels} e={e} rep={rep} />
      </div>
    </div>
  );
}

export default CommentContainer;
