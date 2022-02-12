import "./mainpage.css";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../Posts";
import { useEffect, useState } from "react";
import { getAllPosts, getFollowPosts } from "../../store/posts";
import FooForm from "../FooForm";
import TopBar from "../Nav";
import SideBar from "./sidebar";
import Load from "../loadingAnimations/Load";

function MainPage({ icon, name }) {
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  async function loadAll() {
    await dispatch(getAllPosts());
    setIsLoading(false);
  }
  async function loadFollowed() {
    await dispatch(getFollowPosts());
    setIsLoading(false);
  }
  useEffect(() => {
    let keys = Object.keys(localStorage);
    keys.forEach((e) => {
      if (e.startsWith("com")) localStorage.setItem(e, true);
    });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    if (!session || name === "All") {
      loadAll();
    } else {
      loadFollowed();
    }
  }, [session]);
  return (
    <div className="mainContent">
      <TopBar icon={icon} name={name} />
      <div className="midContent">
        <div className="postContent">
          <FooForm />
          {!isLoading ? <Posts /> : <Load />}
          <span id="spacer"></span>
        </div>

        <SideBar icon={icon} name={name} />
      </div>
    </div>
  );
}

export default MainPage;
