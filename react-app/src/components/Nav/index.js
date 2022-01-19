import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./nav.css"
function Nav() {
  //const session = useSelector((state) => state.session.user)
  const wrapper = useRef(null);
  const [showDiv, setShowDiv] = useState(false);
  return (
    <div
      className="wrapper"
      onClick={(e) => {
        e.stopPropagation();
        setShowDiv(false);
      }}
    >
      <nav>
        <ul className="mainNav">
          <div className="leftnav">
            <li>
              <NavLink
                to="/"
                exact={true}
                activeClassName="active"
                className="logo"
              >
                <img src="Guardian.png" alt=""></img>Guardian
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
              {showDiv && <div className="test"></div>}
            </div>
          </div>
          <div className="rightnav">
            <li>
              <NavLink
                to="/login"
                exact={true}
                activeClassName="active"
                className="login"
              >
                Log in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-up"
                exact={true}
                activeClassName="active"
                className="signup"
              >
                Sign Up
              </NavLink>
            </li>
            <li className="profile">
              <img src="./Guardian.png" width="30px" alt=""></img>
              <i className="fas fa-chevron-down"></i>
            </li>
          </div>
          <div className="profileDrop"></div>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
