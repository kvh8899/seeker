import { toggleLogin, toggleSignup, togglePageOff } from "../../store/toggles";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./Profile";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faK } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
function RightNav({
  setIcons,
  setName,
  profileDrop,
  profile,
  showDiv,
  setShowDiv,
  loadAll,
}) {
  const loginShow = useSelector((state) => state.loginShow);
  const session = useSelector((state) => state.session.user);
  const signupShow = useSelector((state) => state.signupShow);
  const dispatch = useDispatch();
  return (
    <div className="rightnav">
      <div
        className="quickLinks"
        style={{ display: "flex", alignItems: "center", height: "100%" }}
      >
        {session && (
          <>
            <li
              onClick={(e) => {
                if (loadAll) loadAll();
                window.scrollTo(0, 0);
                dispatch(togglePageOff());
                setIcons(<i className="fas fa-signal"></i>);
                document.body.classList.remove("mainContentScroll");
                setName("All");
              }}
            >
              <NavLink to="/all" style={{ color: "black" }}>
                <i className="fas fa-signal"></i>
              </NavLink>
            </li>
            <li
              onClick={(e) => {
                document.body.classList.remove("mainContentScroll");
                dispatch(togglePageOff());
              }}
            >
              <NavLink to="/posts/submit" style={{ color: "black" }}>
                <i className="fas fa-plus"></i>
              </NavLink>
            </li>
            <li>
              <span id="divider"></span>
            </li>
          </>
        )}
        <li>
          <a
            style={{ color: "black" }}
            href="https://github.com/kvh8899/breaddit"
          >
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li>
          <a
            style={{ color: "black" }}
            href="https://www.linkedin.com/in/kylevhuang461/"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a style={{ color: "black" }} href="https://angel.co/u/kyle-huang-7">
            <i className="fab fa-angellist"></i>
          </a>
        </li>
        <li>
          <a style={{ color: "black" }} href="https://kvh8899.github.io/">
            <FontAwesomeIcon icon={faK} />
          </a>
        </li>
      </div>
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
      {session && (
        <Profile
          profileDrop={profileDrop}
          profile={profile}
          showDiv={showDiv}
          setShowDiv={setShowDiv}
        ></Profile>
      )}
    </div>
  );
}

export default memo(RightNav);
