import Posts from "../Posts";
import { getPagePosts } from "../../store/posts";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCurrentPage } from "../../store/currentPage";
import JoinButton from "../JoinButton/index.js";
import EditPage from "../editPage";
import ComData from "../comData";
import FooForm from "../FooForm";
import TopBar from "../Nav/index";
import Load from "../loadingAnimations/Load";
import "./page.css";

function Page() {
  const currentPage = useSelector((state) => state.currentPage);
  const editPageShow = useSelector((state) => state.editPageShow);
  const session = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();

  async function loadPage() {
    if (id) {
      await dispatch(getPagePosts(id));
      await dispatch(getCurrentPage(id));
      setIsLoading(false);
    }
  }

  function cap(str) {
    return <>{str ? str[0].toUpperCase() + str.slice(1) : ""}</>;
  }

  useEffect(() => {
    setIsLoading(true);
    loadPage();
    return async () => {
      await dispatch(getPagePosts(id));
      await dispatch(getCurrentPage(id));
    };
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
            currentPage.theme && !isLoading
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
                    currentPage.profile_image && !isLoading
                      ? currentPage.profile_image
                      : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                  }
                  alt=""
                ></img>
                <div className="ptitles">
                  {!isLoading ? (
                    <h2>{cap(currentPage.title)}</h2>
                  ) : (
                    <h2 id="faker">--------------------------------</h2>
                  )}
                  {!isLoading ? (
                    <p>{currentPage.title}</p>
                  ) : (
                    <p id="faker">--------------------------</p>
                  )}
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
            {!isLoading ? <Posts /> : <Load />}
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
