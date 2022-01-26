import { getCurrentPage } from "../../store/currentPage";
import { getPagePosts } from "../../store/posts";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useRef, useState, useEffect } from "react";
import { postPageOff, toggleCreatePage } from "../../store/toggles";
import { getFollowPosts } from "../../store/posts";
function LeftNav({ icon, name, setName, setIcons }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const wrapper = useRef(null);
  const hist = useHistory();
  const [showDiv, setShowDiv] = useState(false);
  const userPages = useSelector((state) => state.pageList);
  useEffect(() => {
    function close(e) {
      setShowDiv(false);
      document.querySelector(".home")?.classList.remove("border");
    }
    document.body.addEventListener("click", close);
    return () => {
      document.body.removeEventListener("click", close);
    };
  }, []);

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
            hist.push("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <img src="/Guardian.png" alt=""></img>Seeker
        </div>
      </li>
      {session && (
        <div
          className="home"
          onClick={(e) => {
            e.stopPropagation();
            if (!showDiv) {
              setShowDiv(true);
              wrapper.current.classList.add("border");
            }
          }}
          ref={wrapper}
        >
          <div
            className="homeChild"
            onClick={(e) => {
              setShowDiv(false);
              wrapper.current.classList.remove("border");
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
          {showDiv && (
            <div className="comBar">
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
                        setShowDiv(false);
                        dispatch(postPageOff());
                        //dispatch(toggleEditPageOff());
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
          )}
        </div>
      )}
    </div>
  );
}

export default LeftNav;
