import { useSelector } from "react-redux";
import Joined from "./joined";
import Unjoined from "./unjoined";
function JoinButton({cp,sessionId}) {
  const isFollowing = useSelector((state) => state.isFollowing);
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

export default JoinButton;
