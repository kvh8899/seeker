import Posts from "../Posts";
import { getPagePosts } from "../../store/posts";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getCurrentPage } from "../../store/currentPage";
import { checkFollow } from "../../store/checkFollow";
import JoinButton from "../JoinButton/index.js";
import EditPage from "../editPage";
import ComData from "../comData";
import FooForm from "../FooForm";
import TopBar from "../Nav/index";

import "./page.css";

function Page() {
  const currentPage = useSelector((state) => state.currentPage);
  const editPageShow = useSelector((state) => state.editPageShow);
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
    return async() => {
      await dispatch(getPagePosts(id));
      await dispatch(getCurrentPage(id));
    }
  }, [id, session]);

  return (
    <>
      {editPageShow && <EditPage />}
      <div className="mainContent">
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
                  <JoinButton cp={currentPage.id} sessionId={session?.id} />
                </div>
              </div>
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
            <span className="spacer" style={{ height: "200px" }}></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
