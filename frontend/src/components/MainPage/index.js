import "./mainpage.css";
import Posts from "../Posts";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import FooForm from "../FooForm";
import TopBar from "../Nav";
import SideBar from "../Sidebar/sidebar";
import { getAllPosts, getFollowPosts, getMorePosts } from "../../store/posts";
import { getPostLikes } from "../../store/likes";
import { getSLikes } from "../../store/stateLikes";
import Load from "../loadingAnimations/Load";
import Communities from "./communities";
import CurrentSelect from "./currentSelect";

function MainPage({ icon, name }) {
  const [isLoading, setIsLoading] = useState(true);
  const loader = useRef();
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(1);
  const [isIntersecting, setIntersecting] = useState(false);
  async function loadData(posts) {
    if (session) {
      const postLikes = await dispatch(getPostLikes(posts));
      dispatch(getSLikes(postLikes));
    } else {
      dispatch(getSLikes([]));
    }
  }
  async function loadAll() {
    const posts = await dispatch(getAllPosts(0));
    setOffset(1);
    await loadData(posts);
    setIsLoading(false);
  }

  async function loadFollowed() {
    const posts = await dispatch(getFollowPosts(0));
    setOffset(1);
    await loadData(posts);
    setIsLoading(false);
  }
  const iterate = async () => {
    const page = await dispatch(getMorePosts(offset));
    setOffset(page);
  };
  const trigger = ([entry]) => {
    setIntersecting(entry.isIntersecting);
  };
  useEffect(() => {
    setIsLoading(true);
    if (!session || name === "All") {
      loadAll();
    } else {
      loadFollowed();
    }
  }, [session, name]);

  useEffect(() => {
    const options = { threshold: 1 };
    const observer = new IntersectionObserver(trigger, options);

    observer.observe(loader.current);
    return () => {
      observer.unobserve();
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && name === "All") iterate();
  }, [isIntersecting]);

  return (
    <div className="mainContent">
      <TopBar icon={icon} name={name} />
      <div className="midContent">
        <div className="postContent">
          <FooForm />
          {!isLoading ? <Posts name={name} /> : <Load />}
          <span id="spacer" ref={loader}></span>
        </div>

        <SideBar>
          <Communities />
          <CurrentSelect icon={icon} name={name} />
        </SideBar>
      </div>
    </div>
  );
}

export default MainPage;
