import { getCurrentPage } from "../../store/currentPage";
import { getPagePosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useRef, useState, memo } from "react";
import { postPageOff, toggleCreatePage } from "../../store/toggles";
import guardianImg from "../../images/Guardian.png";
import { subString } from "../utils";
function LeftNav({ icon, name, setName, setIcons, homeBar, loadFollowed }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const wrapper = useRef(null);
  const hist = useHistory();
  const [filter, setFilter] = useState("");
  const userPages = useSelector((state) => state.pageList);

  return (
    <div className="leftnav">
      <li>
        <div
          className="logo"
          onClick={async (e) => {
            dispatch(postPageOff());
            if (session) {
              loadFollowed();
            }
            setName("Home");
            setIcons(<i className="fas fa-home"></i>);
            document.body.classList.remove("mainContentScroll");
            window.scrollTo(0, 0);
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
              wrapper.current.classList.toggle("border");
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
            <input
              placeholder="Filter"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            ></input>
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
                if (filter && !subString(ex.title, filter)) return "";
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

export default memo(LeftNav);
