import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CommentContainer from "./commentContainer";
import { traversal, getPath } from "../utils";
import { addMap } from "../../store/commentsMap";
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
  const dispatch = useDispatch();
  function render_Comments(postComments) {
    let arr = [];
    postComments?.forEach((e) => {
      let data = traversal(0, e, []);
      data.forEach((e) => {
        let path = getPath(e[1]);
        dispatch(addMap(`com${e[1].id}`, e[2]));
        arr.push(
          <CommentContainer
            e={e[1]}
            level={e[0]}
            path={path}
          ></CommentContainer>
        );
      });
    });
    return arr;
  }
  return (
    <CContainer>
      <InnerCContainer>{render_Comments(postComments)}</InnerCContainer>
    </CContainer>
  );
}

export default Comment;
