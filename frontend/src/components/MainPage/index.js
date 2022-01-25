import "./mainpage.css";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../Posts";
import { useEffect } from "react";
import { getAllPosts, getFollowPosts } from "../../store/posts";
import FooForm from "../FooForm";
import TopBar from "../Nav";
import SideBar from "./sidebar";
function MainPage() {
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  async function loadAll() {
    await dispatch(getAllPosts());
  }

  async function loadFollowed() {
    await dispatch(getFollowPosts());
  }

  useEffect(() => {
    if (!session) {
      loadAll();
    } else {
      loadFollowed();
    }
  }, [session]);

  return (
    <div className="mainContent mainContentScroll">
      <TopBar icon={<i className="fas fa-home"></i>} name={"Home"} />
      <div className="midContent">
        <div className="postContent">
          <FooForm />
          <Posts />
          <span id="spacer"></span>
        </div>
        <SideBar />
      </div>
    </div>
  );
}

export default MainPage;
