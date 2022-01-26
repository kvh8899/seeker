import { toggleLogin, toggleSignup, togglePageOff } from "../../store/toggles";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../store/posts";
import { NavLink } from "react-router-dom";
function RightNav({ showProfDiv, setShowProfDiv, setIcons, setName }) {
  const loginShow = useSelector((state) => state.loginShow);
  const session = useSelector((state) => state.session.user);
  const signupShow = useSelector((state) => state.signupShow);
  const dispatch = useDispatch();
  return (
    <div className="rightnav">
      {session && (
        <div
          className="quickLinks"
          style={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          <li
            onClick={(e) => {
              dispatch(getAllPosts());
              dispatch(togglePageOff());
              setIcons(<i className="fas fa-signal"></i>);
              setName("All");
            }}
          >
            <NavLink to="/all" style={{ color: "black" }}>
              <i className="fas fa-signal"></i>
            </NavLink>
          </li>
          <li
            onClick={(e) => {
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
            <a
              style={{ color: "black" }}
              href="https://angel.co/u/kyle-huang-7"
            >
              <i className="fab fa-angellist"></i>
            </a>
          </li>
        </div>
      )}

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
  );
}

export default RightNav;
