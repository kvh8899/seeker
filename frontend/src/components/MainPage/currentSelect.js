import Card from "./card";
import knight from "../../images/knight.gif";
import { toggleCreatePage, toggleLogin } from "../../store/toggles";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const Description = styled.p`
  margin: 10px;
  top: -65px;
  position: relative;
`;
const SideButtonC = styled.button`
  padding: 8px 15px;
  border-radius: 25px;
  background-color: rgb(28, 138, 228);
  border: none;
  color: white;
  font-size: 16px;
  margin: 5px 10px;
`;
const SideButtonCo = styled.button`
  padding: 8px 15px;
  border-radius: 25px;
  background-color: white;
  border: 1px solid rgb(28, 138, 228);
  color: rgb(28, 138, 228);
  font-size: 16px;
  margin: 5px 10px;
`;
function CurrentSelect({ name, icon }) {
  const dispatch = useDispatch();
  const hist = useHistory();
  const session = useSelector((state) => state.session.user);
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <img
          src={knight}
          alt=""
          style={{
            margin: "0px",
            position: "relative",
            width: "200px",
            left: "-45px",
            top: "-65px",
          }}
        ></img>
        <h2
          style={{
            margin: "0px",
            position: "relative",
            left: "-100px",
            top: "-65px",
          }}
        >
          {name}
        </h2>
      </div>
      {name === "Home" ? (
        <Description>
          Your personal frontpage. Come here to check in with your favorite
          communities.
        </Description>
      ) : (
        <Description>
          The most active posts. Come here to see new posts rising and be a part
          of the conversation.
        </Description>
      )}
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          top: "-70px",
        }}
      >
        <SideButtonC
          onClick={(e) => {
            if (session) {
              hist.push("/posts/submit");
            } else {
              dispatch(toggleLogin());
            }
          }}
        >
          Create a Post
        </SideButtonC>
        <SideButtonCo
          onClick={(e) => {
            if (session) {
              dispatch(toggleCreatePage());
            } else {
              dispatch(toggleLogin());
            }
          }}
        >
          Create a Community
        </SideButtonCo>
      </div>
    </Card>
  );
}

export default CurrentSelect;
