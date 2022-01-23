import { getCurrentPage } from "../../store/currentPage";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserList } from "../../store/pages";
import { getPagePosts } from "../../store/posts";
import LogoutButton from "../auth/LogoutButton";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useRef, useState } from "react";
import { useEffect } from "react";
import {
  toggleLogin,
  postPageOff,
  toggleCreatePage,
  toggleSignup,
  toggleEditPage
} from "../../store/toggles";
import "./nav.css";

function Nav({ name, icon }) {
  const session = useSelector((state) => state.session.user);
  const wrapper = useRef(null);
  const hist = useHistory();
  const [showDiv, setShowDiv] = useState(false);
  const [showProfDiv, setShowProfDiv] = useState(false);
  const loginShow = useSelector((state) => state.loginShow);
  const signupShow = useSelector((state) => state.signupShow);
  const userPages = useSelector((state) => state.pageList);
  const dispatch = useDispatch();

  async function loadData() {
    await dispatch(fetchUserList(session.id));
  }
  useEffect(() => {
    //temporary fix to divs not closing, must use redux instead
    function close(e) {
      setShowDiv(false);
      setShowProfDiv(false);
      document.querySelector(".home")?.classList.remove("border");
    }

    document.body.addEventListener("click",close);

    return () => {
      document.body.removeEventListener("click",close);
    };

  }, []);

  useEffect(() => {
    if (session) loadData();
  }, [session]);
  return (
    <div
      className="wrapper unselectable"
      onClick={(e) => {
        e.stopPropagation();
        setShowDiv(false);
        setShowProfDiv(false);
        if (session) {
          wrapper.current.classList.remove("border");
        }
      }}
    >
      <nav>
        <ul className="mainNav">
          <div className="leftnav">
            <li>
              <NavLink
                to="/"
                exact={true}
                className="logo"
                onClick={(e) => {
                  dispatch(postPageOff());
                  //dispatch(toggleEditOff());
                }}
              >
                <img src="/Guardian.png" alt=""></img>Seeker
              </NavLink>
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
                    {icon} {name}
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
                                {ex.profile_image ? (
                                  <img src={ex.profile_image} alt=""></img>
                                ) : (
                                  <img
                                    src="https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                                    alt=""
                                  ></img>
                                )}
                                <p>{ex.title}</p>
                              </div>
                              <div>
                                {session?.id === ex.owner_id && (
                                  <button>
                                    <i className="far fa-edit"></i>
                                  </button>
                                )}
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
          <div className="rightnav">
            {!session && (
              <>
                <li>
                  <button
                    className="login"
                    onClick={(e) => {
                      if (!loginShow) dispatch(toggleLogin());
                    }}
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    to="/sign-up"
                    className="signup"
                    onClick={(e) => {
                      if (!signupShow) dispatch(toggleSignup());
                    }}
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
            <li
              className="profile"
              onClick={(e) => {
                e.stopPropagation();
                if (!showProfDiv) {
                  setShowProfDiv(true);
                } else {
                  setShowProfDiv(false);
                }
              }}
            >
              <div>
                <img src="/Guardian.png" width="30px" alt=""></img>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div>{session && session.username}</div>
            </li>
          </div>
          {showProfDiv && (
            <div
              className="profileDrop"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {session && (
                <LogoutButton showDiv={showDiv} setShowDiv={setShowDiv} />
              )}
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
