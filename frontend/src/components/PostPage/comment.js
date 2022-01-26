import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const CContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 3px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const CContent = styled.div``;
function Comment() {
  const comments = useSelector((state) => state.postComments);

  return (
    <CContainer id="pcdiv">
      {comments.map((e) => {
        return <div>{e.content}</div>;
      })}
    </CContainer>
  );
}

export default Comment;
