import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkFollow } from "../../store/checkFollow";
import { memo } from "react";
import Joined from "./joined";
import Unjoined from "./unjoined";
function JoinButton({ cp, sessionId }) {
  const isFollowing = useSelector((state) => state.isFollowing);
  const currentPost = useSelector((state) => state.currentPost);
  const dispatch = useDispatch();
  async function loadData() {
    if (cp && sessionId) await dispatch(checkFollow(cp, sessionId));
  }
  useEffect(() => {
    loadData();
  }, [cp]);
  return (
    <>
      {isFollowing ? (
        <Joined cp={currentPost.page?.id} sessionId={sessionId} />
      ) : (
        <Unjoined cp={currentPost.page?.id} sessionId={sessionId} />
      )}
    </>
  );
}

export default memo(JoinButton);
