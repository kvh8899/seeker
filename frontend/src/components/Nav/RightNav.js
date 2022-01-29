import { toggleLogin, toggleSignup, togglePageOff } from "../../store/toggles";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../store/posts";
import LogoutButton from "../auth/LogoutButton";
import { NavLink } from "react-router-dom";
function RightNav({
  setIcons,
  setName,
  showDiv,
  setShowDiv,
  profileDrop,
  profile,
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
                dispatch(getAllPosts());
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
        <li style={{ fontSize: "16px", fontWeight: "bold" }}>
          <NavLink to="/about" style={{ color: "black" }}>
            About
          </NavLink>
        </li>
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
        <li
          className="profile"
          onClick={(e) => {
            e.stopPropagation();
            profile.current.classList.toggle("profileStick");
            profileDrop.current.classList.toggle("displayNun");
            profileDrop.current.classList.toggle("profileDrop");
          }}
          ref={profile}
        >
          <div className="profileMeta">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/Guardian.png"
                width="30px"
                alt=""
                style={{ marginRight: "5px" }}
              ></img>
              <div>{session && session.username}</div>
            </div>
            <i className="fas fa-chevron-down"></i>
          </div>

          <div
            className="displayNun"
            onClick={(e) => {
              e.stopPropagation();
            }}
            ref={profileDrop}
          >
            {session && (
              <LogoutButton showDiv={showDiv} setShowDiv={setShowDiv} />
            )}
          </div>
        </li>
      )}
    </div>
  );
}

export default RightNav;
