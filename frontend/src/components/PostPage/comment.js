import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { replyTo } from "../../store/comments";
import currentPage from "../../store/currentPage";
import currentPost from "../../store/currentPost";

const CContainer = styled.div`
  width: 100%;
  border-radius: 3px 3px 0px 0px;
  display: flex;
  flex-direction: column;
  min-height: 0px;
  min-height: 100px;
`;
const InnerCContainer = styled.div`
  margin-left: 5px;
  max-width: 635px;
  margin: 20px;
`;
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

const Thread = styled.div`
  border: 1px solid lightgray;
  width: 0px;
  margin-right: 20px;
`;
const NestedThread = styled.div`
  border: 1px solid lightgray;
  width: 0px;
  margin-right: 20px;
  margin-left: 13px;
`;
const Text = styled.div`
  display: flex;
  margin-top: 6px;
  margin-left: 13px;
  min-height: 50px;
`;
const UserData = styled.div`
  width: 100%;
`;
function Comment() {
  const comments = useSelector((state) => state.postComments);
  const currentPost = useSelector((state) => state.currentPost);
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  const rep = useRef([]);
  useEffect(() => {
    rep.current = rep.current.slice(0, comments.length);
  }, [comments]);
  return (
    <CContainer>
      <InnerCContainer>
        {comments.map((e, i) => {
          return (
            <div key={e.id}>
              <CContent key={e.id}>
                <UserData>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <ProfImage
                      src={e.profile_image ? e.profile_image : "/Guardian.png"}
                      alt=""
                    ></ProfImage>
                    <div>{e.owner?.username}</div>
                  </div>
                  <Text>
                    <Thread></Thread>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {e.content}
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
                          rep.current[i].classList.toggle("displayNun");
                          rep.current[i].classList.toggle("reply");
                        }}
                      >
                        Reply
                      </button>
                    </div>
                  </Text>
                </UserData>
              </CContent>
              <div
                id={"repinput" + e.id}
                className="displayNun"
                ref={(e) => (rep.current[i] = e)}
              >
                <NestedThread />
                <UserData>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  ></div>
                  <Text>
                    <Thread></Thread>
                    <form
                      style={{ position: "relative", height: "132px" }}
                      onSubmit={(event) => {
                        event.preventDefault();
                        dispatch(
                          replyTo(e.id, {
                            content: reply,
                            post_id: currentPost.id,
                          })
                        );
                        rep.current[i].classList.toggle("displayNun");
                        rep.current[i].classList.toggle("reply");
                        setReply("");
                      }}
                    >
                      <textarea
                        value={reply}
                        onChange={(e) => {
                          setReply(e.target.value);
                        }}
                      ></textarea>
                      <div className="repButton">
                        <button
                          className="repcanc"
                          onClick={(e) => {
                            rep.current[i].classList.toggle("displayNun");
                            rep.current[i].classList.toggle("reply");
                          }}
                        >
                          Cancel
                        </button>
                        <button className="repsub">Submit</button>
                      </div>
                    </form>
                  </Text>
                </UserData>
              </div>
            </div>
          );
        })}
      </InnerCContainer>
    </CContainer>
  );
}

export default Comment;
