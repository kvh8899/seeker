import Posts from "../Posts";
import { getPagePosts } from "../../store/posts";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getCurrentPage } from "../../store/currentPage";
import { checkFollow, Follow, UnFollow } from "../../store/checkFollow";
import EditPage from "../editPage";
import ComData from "../comData";
import FooForm from "../FooForm";
import TopBar from "../Nav/index";
import { fetchUserList } from "../../store/pages";
import { toggleLogin } from "../../store/toggles";
import "./page.css";

function Page() {
  const currentPage = useSelector((state) => state.currentPage);
  const editPageShow = useSelector((state) => state.editPageShow);
  const isFollowing = useSelector((state) => state.isFollowing);
  const session = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  async function loadPage() {
    if (id) {
      await dispatch(getPagePosts(id));
      await dispatch(getCurrentPage(id));
      await dispatch(checkFollow(id, session));
    }
  }

  function cap(str) {
    return <>{str ? str[0].toUpperCase() + str.slice(1) : ""}</>;
  }

  useEffect(() => {
    loadPage();
  }, [id, session]);

  return (
    <>
      {editPageShow && <EditPage />}
      <div className="mainContent mainContentScroll">
        <TopBar
          icon={
            <img
              src={
                currentPage.profile_image
                  ? currentPage.profile_image
                  : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
              }
              alt=""
            ></img>
          }
          name={currentPage.title}
        />
        <div
          className="banner"
          style={
            currentPage.theme
              ? {
                  backgroundImage: `url(${currentPage.theme})`,
                  backgroundSize: "cover",
                  backgroundPosition: "0px -100px",
                }
              : {}
          }
        >
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
                  <h2>{cap(currentPage.title)}</h2>
                  <p>{currentPage.title}</p>
                </div>
                <div className="bannerf">
                  {isFollowing ? (
                    <button
                      id="joined"
                      style={{
                        backgroundColor: "rgb(25, 159, 221)",
                        color: "white",
                        border: "none",
                      }}
                      onClick={async (e) => {
                        await dispatch(UnFollow(currentPage.id));
                        await dispatch(fetchUserList(session.id));
                      }}
                      onMouseOver={(e) => {
                        e.target.innerText = "Unsubscribe";
                        e.target.style.backgroundColor = "#CC5500";
                      }}
                      onMouseLeave={(e) => {
                        e.target.innerText = "Joined";
                        e.target.style.backgroundColor = "rgb(25, 159, 221)";
                      }}
                    >
                      Joined
                    </button>
                  ) : (
                    <button
                      id="join"
                      onClick={async (e) => {
                        if (session) {
                          await dispatch(Follow(currentPage.id));
                          await dispatch(fetchUserList(session.id));
                        } else {
                          dispatch(toggleLogin());
                        }
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "rgb(25, 159, 221)";
                        e.target.style.border = "none";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.border = "1px solid black";
                        e.target.style.color = "black";
                      }}
                    >
                      Join
                    </button>
                  )}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="midContent">
          <div className="postContent">
            <FooForm />
            <Posts />
            <span id="spacer"></span>
          </div>
          <div className="sideBar">
            <ComData />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
