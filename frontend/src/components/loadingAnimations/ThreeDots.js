import styled from "styled-components";
import "./ThreeDots.css";
const DotContainer = styled.div`
  display: flex;

  & > div {
    border-radius: 100%;
    background-color: gray;
    height: 15px;
    width: 15px;
    margin: 0px 10px;
  }
`;
function ThreeDots() {
  return (
    <DotContainer>
      <div className="first-dot"></div>
      <div className="second-dot"></div>
      <div className="third-dot"></div>
    </DotContainer>
  );
}

export default ThreeDots;
