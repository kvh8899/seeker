import styled from "styled-components";
import { useSelector } from "react-redux";
import CommentContainer from "./commentContainer";
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
  function getPath(object) {
    let path = [];
    while (object.parent) {
      path.push(`${object.parent.id}`);
      object = object.parent;
    }
    return path;
  }
  function dfs() {
    let arr = [];
    postComments?.forEach((e, i) => {
      let data = traversal(0, e, []);
      data.forEach((e) => {
        let path = getPath(e[1]);
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
  function traversal(value = 0, comment, arr = []) {
    arr.push([value, comment]);
    if (!comment.replies.length) return arr;

    for (let i = 0; i < comment.replies.length; i++) {
      comment.replies[i].parent = comment;
      arr = traversal(value + 1, comment.replies[i], arr);
    }
    return arr;
  }
  return (
    <CContainer>
      <InnerCContainer>{dfs()}</InnerCContainer>
    </CContainer>
  );
}

export default Comment;
