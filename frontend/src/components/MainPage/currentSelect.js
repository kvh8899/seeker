import styled from "styled-components";
function CurrentSelect() {
  const CurrentDiv = styled.div`
    height: 300px;
    width: 100%;
    background-color: white;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top:20px;
  `;
  return <CurrentDiv></CurrentDiv>;
}

export default CurrentSelect;
