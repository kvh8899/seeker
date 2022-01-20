import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../store/loginShow";
import { toggleSignup } from "../../store/signupShow";
import "./nav.css";
import { useEffect } from "react";
import { fetchUserList } from "../../store/pages";
import { toggleCreatePage } from "../../store/createPageShow";
function Nav() {
  const session = useSelector((state) => state.session.user);
  const wrapper = useRef(null);
  const [showDiv, setShowDiv] = useState(false);
  const [showProfDiv, setShowProfDiv] = useState(false);
  const loginShow = useSelector((state) => state.loginShow);
  const signupShow = useSelector((state) => state.signupShow);
  const cPageShow = useSelector((state) => state.createPageShow);
  const userPages = useSelector((state) => state.pageList);
  const dispatch = useDispatch();
  async function loadData() {
    await dispatch(fetchUserList(session.id));
  }
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
        wrapper.current.classList.remove("border");
      }}
    >
      <nav>
        <ul className="mainNav">
          <div className="leftnav">
            <li>
              <NavLink to="/" exact={true} className="logo">
                <img src="Guardian.png" alt=""></img>Seeker
              </NavLink>
            </li>

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
              {session && (
                <div
                  className="homeChild"
                  onClick={(e) => {
                    setShowDiv(false);
                    wrapper.current.classList.remove("border");
                  }}
                >
                  <div>
                    <i className="fas fa-home"></i> Home
                  </div>
                  <div>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
              )}
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
                    {userPages.map((e) => {
                      return (
                        <div className="comContainer" key={e.id}>
                          <div className="communities">
                            <div className="comName">
                              <img src={e.profile_image} alt=""></img>
                              <p>{e.title}</p>
                            </div>
                            <div>
                              {session?.id === e.owner_id && (
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
          </div>
          <div className="rightnav">
            {!session && (
              <>
                <li>
                  <button
                    className="login"
                    onClick={(e) => {
                      if (!loginShow) dispatch(toggle());
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
                <img src="./Guardian.png" width="30px" alt=""></img>
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
              {session && <LogoutButton showDiv={showDiv} setShowDiv={setShowDiv}/>}
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
