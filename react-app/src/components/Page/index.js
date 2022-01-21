import Nav from "../Nav";
import Posts from "../Posts";
import FloatingLogin from "../FloatingLogin";
import FloatingSignup from "../FloatingSignup";
import CreatePage from "../CreatePage";
import { getPagePosts } from "../../store/posts";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getCurrentPage } from "../../store/currentPage";
import "./page.css";
function Page() {
  const loginShow = useSelector((state) => state.loginShow);
  const signupShow = useSelector((state) => state.signupShow);
  const createPageShow = useSelector((state) => state.createPageShow);
  const currentPage = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
  const { id } = useParams();
  async function loadPage() {
    await dispatch(getPagePosts(id));
    await dispatch(getCurrentPage(id));
  }

  function cap(str) {
    return <>{str ? str[0].toUpperCase() + str.slice(1) : ""}</>;
  }

  function extractDate(str) {
    const day = str.match(/ \d\d /);
    const month = str.match(/ \w{3} /);
    const year = str.match(/ \d{4} /);
    return `${month.join().trim()} ${day.join().trim()}, ${year
      .join()
      .trim()} `;
  }

  useEffect(() => {
    loadPage();
  }, [id]);

  return (
    <div className="mainContent">
      <Nav
        icon={<img src={currentPage.profile_image} alt=""></img>}
        name={currentPage.title}
      />
      <div className="banner">
        <div>
          <div className="bannerData">
            <div>
              <img
                src={
                  currentPage.profile_image
                    ? currentPage.profile_image
                    : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                }
                alt=""
              ></img>
              <div className="ptitles">
                <h2>{cap(currentPage.followers_type)}</h2>
                <p>{currentPage.title}</p>
              </div>
              <div className="bannerf">
                <button>Joined</button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      {loginShow && <FloatingLogin />}
      {signupShow && <FloatingSignup />}
      {createPageShow && <CreatePage />}
      <div className="midContent">
        <div className="postContent">
          <Posts />
        </div>
        <div className="sideBar">
          <div className="comSideBar">
            <div className="aboutHeader">
              <p>About Community</p>
            </div>
            <div className="aboutData">
              <p>Welcome to {currentPage.title}</p>
              <div>
                <p>{currentPage.subscribers} </p>
                <p>{cap(currentPage.followers_type)}</p>
              </div>
              <span></span>
              <div>
                <p><i className="fas fa-birthday-cake"></i> Created {currentPage.created_at && extractDate(currentPage.created_at)}</p>
              </div>
              <div>
                  <button>Create Post</button>
                  <button>Edit Page</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
