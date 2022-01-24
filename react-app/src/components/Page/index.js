import Posts from "../Posts";
import { getPagePosts } from "../../store/posts";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { getCurrentPage } from "../../store/currentPage";
import PostPage from "../PostPage";
import EditPage from "../editPage";
import ComData from "../comData";
import FooForm from "../FooForm";
import TopBar from "../Nav/index";
import "./page.css";

function Page() {
  const currentPage = useSelector((state) => state.currentPage);
  const editPageShow = useSelector((state) => state.editPageShow);
  const postPageShow = useSelector((state) => state.postPageShow);
  const dispatch = useDispatch();
  const { id } = useParams();

  async function loadPage() {
    await dispatch(getPagePosts(id));
    await dispatch(getCurrentPage(id));
  }

  function cap(str) {
    return <>{str ? str[0].toUpperCase() + str.slice(1) : ""}</>;
  }

  useEffect(() => {
    loadPage();
  }, [id]);

  return (
    <>
      {editPageShow && <EditPage />}
      {postPageShow && <PostPage />}
      <div className="mainContent mainContentScroll">
        <TopBar
          icon={<img src={currentPage.profile_image} alt=""></img>}
          name={currentPage.title}
        />
        <div
          className="banner"
          style={{
            backgroundImage: `url(${currentPage.theme})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
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
                  <button>Joined</button>
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
