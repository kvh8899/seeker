import styled from "styled-components";
import { BannerTitle } from "./communities";
import banner from "../../images/banner.png";
const CurrentDiv = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 3px;
  margin-top: 20px;
  top: 70px;
  height: 275px;
`;
const Banner = styled.div`
  width: 100%;
  height: 40px;
  background-image: url("${banner}");
  background-size: cover;
  background-position: top 0px left -10px;
  border-radius: 3px 3px 0px 0px;
  display: flex;
  align-items: flex-end;
`;

function Card({ children }) {
  return (
    <CurrentDiv>
      <Banner>
        <BannerTitle></BannerTitle>
      </Banner>
      {children}
    </CurrentDiv>
  );
}

export default Card;
