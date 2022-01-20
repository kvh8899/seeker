import Nav from "../Nav";
import "./mainpage.css";
import { useSelector, useDispatch } from "react-redux";
import FloatingLogin from "../FloatingLogin";
import FloatingSignup from "../FloatingSignup";
import CreatePage from "../CreatePage";
import { useEffect } from "react";
import { getAllPosts, getFollowPosts } from "../../store/posts";
function MainPage() {
  const loginShow = useSelector((state) => state.loginShow);
  const signupShow = useSelector((state) => state.signupShow);
  const createPageShow = useSelector((state) => state.createPageShow);
  const session = useSelector((state) => state.session.user);
  const postList = useSelector((state) => state.postList);
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
    <div className="mainContent">
      <Nav />
      {loginShow && <FloatingLogin />}
      {signupShow && <FloatingSignup />}
      {createPageShow && <CreatePage />}
      <div className="midContent">
        <div className="postContent">
          {postList.map((e) => {
            return (
              <div key={e.id}>
                <div>
                  <div></div>
                  <div>
                    <h4>{e.heading}</h4>
                    <p></p>
                  </div>
                  <div>
                    <p></p>
                    <p></p>
                  </div>
                </div>
                <div></div>
              </div>
            );
          })}
        </div>
        <div className="sideBar"></div>
      </div>
    </div>
  );
}

export default MainPage;
