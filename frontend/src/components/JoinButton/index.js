import { useSelector } from "react-redux";
import Joined from "./joined";
import Unjoined from "./unjoined";
function JoinButton() {
  const isFollowing = useSelector((state) => state.isFollowing);
  const currentPage = useSelector((state) => state.currentPage);
  const session = useSelector((state) => state.session.user);
  return (
    <>
      {isFollowing ? (
        <Joined cp={currentPage.id} sessionId={session.id} />
      ) : (
        <Unjoined cp={currentPage.id} sessionId={session.id} />
      )}
    </>
  );
}

export default JoinButton;
