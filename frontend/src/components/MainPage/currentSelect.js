import styled from "styled-components";

const CurrentDiv = styled.div`
  height: 300px;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  margin-top: 20px;
  position: -webkit-sticky;
  position: sticky;
  top: 70px;
`;

function CurrentSelect() {
  return <CurrentDiv></CurrentDiv>;
}

export default CurrentSelect;
