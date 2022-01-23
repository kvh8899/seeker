import Nav from "../Nav";
import "./mainpage.css";
import { useSelector, useDispatch } from "react-redux";
import FloatingLogin from "../FloatingLogin";
import FloatingSignup from "../FloatingSignup";
import CreatePage from "../CreatePage";
import Posts from "../Posts";
import { useEffect } from "react";
import { getAllPosts, getFollowPosts } from "../../store/posts";
import PostPage from "../PostPage";

function MainPage() {
  const loginShow = useSelector((state) => state.loginShow);
  const signupShow = useSelector((state) => state.signupShow);
  const createPageShow = useSelector((state) => state.createPageShow);
  const postPageShow = useSelector((state) => state.postPageShow);
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
      <Nav icon={<i className="fas fa-home"></i>} name={"Home"} />
      {loginShow && <FloatingLogin />}
      {signupShow && <FloatingSignup />}
      {createPageShow && <CreatePage />}
      {postPageShow && <PostPage />}
      <div className="midContent">
        <div className="postContent">
          <div className="createPost">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input placeholder="Create Post"></input>
            </form>
          </div>
          <Posts />
        </div>
        <div className="sideBar"></div>
      </div>
    </div>
  );
}

export default MainPage;
