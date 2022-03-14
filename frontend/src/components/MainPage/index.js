import "./mainpage.css";
import Posts from "../Posts";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FooForm from "../FooForm";
import TopBar from "../Nav";
import SideBar from "./sidebar";
import { getAllPosts, getFollowPosts } from "../../store/posts";
import { getPostLikes } from "../../store/likes";
import { getSLikes } from "../../store/stateLikes";
import Load from "../loadingAnimations/Load";
function MainPage({ icon, name }) {
  const [isLoading, setIsLoading] = useState(true);
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  async function loadData(posts) {
    if (session) {
      const postLikes = await dispatch(getPostLikes(posts));
      dispatch(getSLikes(postLikes));
    } else {
      dispatch(getSLikes([]));
    }
  }
  async function loadAll() {
    const posts = await dispatch(getAllPosts());
    await loadData(posts);
    setIsLoading(false);
  }
  async function loadFollowed() {
    const posts = await dispatch(getFollowPosts());
    await loadData(posts);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    if (!session || name === "All") {
      loadAll();
    } else {
      loadFollowed();
    }
  }, [session, name]);

  return (
    <div className="mainContent">
      <TopBar icon={icon} name={name} />
      <div className="midContent">
        <div className="postContent">
          <FooForm />
          {!isLoading ? <Posts name={name} /> : <Load />}
          <span id="spacer"></span>
        </div>

        <SideBar icon={icon} name={name} />
      </div>
    </div>
  );
}

export default MainPage;
