import styled from "styled-components";
import { BannerTitle } from "./communities";
import { toggleCreatePage, toggleLogin } from "../../store/toggles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import knight from "../../images/knight.gif";
const CurrentDiv = styled.div`
  height: 275px;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  margin-top: 20px;
  position: -webkit-sticky;
  position: sticky;
  top: 70px;
`;
const Banner = styled.div`
  width: 100%;
  height: 40px;
  background-image: url("https://images.fineartamerica.com/images-medium-large-5/abstract-art-blue-red-white-by-kredart-serg-wiaderny.jpg");
  background-size: cover;
  background-position: top -20px;
  border-radius: 3px 3px 0px 0px;
  display: flex;
  align-items: flex-end;
`;
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
function CurrentSelect({ name }) {
  const dispatch = useDispatch();
  const hist = useHistory();
  const session = useSelector((state) => state.session.user);
  return (
    <CurrentDiv>
      <Banner>
        <BannerTitle></BannerTitle>
      </Banner>
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
    </CurrentDiv>
  );
}

export default CurrentSelect;
