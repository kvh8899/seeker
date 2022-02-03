import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkFollow } from "../../store/checkFollow";
import { memo } from "react";
import Joined from "./joined";
import Unjoined from "./unjoined";
function JoinButton({ cp, sessionId }) {
  const isFollowing = useSelector((state) => state.isFollowing);
  const dispatch = useDispatch();
  async function loadData() {
    if (cp) await dispatch(checkFollow(cp, sessionId));
  }
  useEffect(() => {
    loadData();
  }, [cp, sessionId]);
  return (
    <>
      {isFollowing ? (
        <Joined cp={cp} sessionId={sessionId} />
      ) : (
        <Unjoined cp={cp} sessionId={sessionId} />
      )}
    </>
  );
}

export default memo(JoinButton);
