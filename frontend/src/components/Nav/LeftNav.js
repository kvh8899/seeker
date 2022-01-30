import { getCurrentPage } from "../../store/currentPage";
import { getPagePosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useRef } from "react";
import { postPageOff, toggleCreatePage } from "../../store/toggles";
import { getFollowPosts } from "../../store/posts";
import guardianImg from "../../images/Guardian.png";
function LeftNav({ icon, name, setName, setIcons, homeBar }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const wrapper = useRef(null);
  const hist = useHistory();

  const userPages = useSelector((state) => state.pageList);

  return (
    <div className="leftnav">
      <li>
        <div
          className="logo"
          onClick={async (e) => {
            dispatch(postPageOff());
            if (session) {
              await dispatch(getFollowPosts());
            }
            setName("Home");
            setIcons(<i className="fas fa-home"></i>);
            document.body.classList.remove("mainContentScroll");
            hist.push("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <img src={guardianImg} alt=""></img>Seeker
        </div>
      </li>
      {session && (
        <div
          className="home"
          onClick={(e) => {
            e.stopPropagation();
          }}
          ref={wrapper}
        >
          <div
            className="homeChild"
            onClick={(e) => {
              if (homeBar.current) {
                homeBar.current.classList.toggle("displayNun");
                homeBar.current.classList.toggle("comBar");
              }
              wrapper.current.classList.add("border");
            }}
          >
            <div className="tof">
              <div id="navTabIcon">{icon}</div>
              <p id="navTab" style={{ margin: "0px 10px" }}>
                {name}
              </p>
            </div>
            <div>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>

          <div className="displayNun" ref={homeBar}>
            <input placeholder="Filter"></input>
            <div>
              <div className="myComs">
                <p>My Communities</p>
              </div>
              <div
                className="createCom"
                onClick={(e) => {
                  dispatch(toggleCreatePage());
                }}
              >
                <i className="fas fa-plus"></i> Create Community
              </div>
              {userPages.map((ex) => {
                return (
                  <div
                    className="comContainer"
                    id={ex.id}
                    key={ex.id}
                    onClick={async (e) => {
                      await dispatch(getPagePosts(ex.id));
                      await dispatch(getCurrentPage(ex.id));
                      dispatch(postPageOff());
                      homeBar.current.classList.add("displayNun");
                      homeBar.current.classList.remove("comBar");
                      wrapper.current.classList.remove("border");
                      hist.push(`/pages/${ex.id}`);
                    }}
                  >
                    <div className="communities">
                      <div className="comName">
                        {
                          <img
                            src={
                              ex.profile_image
                                ? ex.profile_image
                                : "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                            }
                            alt=""
                          ></img>
                        }
                        <p>{ex.title}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftNav;
