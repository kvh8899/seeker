import styled from "styled-components";
import { useSelector } from "react-redux";
import CommentContainer from "./commentContainer";
import { render_Comments } from "../utils";
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
function Comment() {
  const postComments = useSelector((state) => state.postComments);
  return (
    <CContainer>
      <InnerCContainer>
        {render_Comments(postComments, CommentContainer)}
      </InnerCContainer>
    </CContainer>
  );
}

export default Comment;
