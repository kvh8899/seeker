import styled from "styled-components";

const SubmitProfileButton = styled.button`
  box-sizing: border-box;
  margin-bottom: 20px;
  border: none;
  padding: 10px 0px;
  width: 100%;
  background-color: rgb(28,138,228);;
  color: white;
  border-radius: 25px;
  font-size:16px;
`;
function SubmitProfileChangeButton({ children }) {
  return <SubmitProfileButton>{children}</SubmitProfileButton>;
}

export default SubmitProfileChangeButton;
