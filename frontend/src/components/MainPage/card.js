import styled from "styled-components";
import { BannerTitle } from "./communities";
import banner from "../../images/banner.png";
const CurrentDiv = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 3px;
  margin-bottom: 20px;
  top: 70px;
  border: 1px solid rgb(187, 187, 187);
`;
const Banner = styled.div`
  width: 100%;
  height: 45px;
  background-image: url("${banner}");
  background-size: cover;
  background-position: top 0px left -10px;
  border-radius: 3px 3px 0px 0px;
  display: flex;
  align-items: flex-end;
`;

function Card({ children, showBanner, bannerTitle }) {
  return (
    <CurrentDiv>
      {showBanner ? (
        <Banner>
          <BannerTitle>{bannerTitle}</BannerTitle>
        </Banner>
      ) : (
        ""
      )}
      {children}
    </CurrentDiv>
  );
}

export default Card;
