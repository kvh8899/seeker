import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useRef, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { toggle } from "../../store/loginShow";
import { toggleSignup } from "../../store/signupShow";
import "./nav.css";

function Nav() {
  const session = useSelector((state) => state.session.user);
  const wrapper = useRef(null);
  const [showDiv, setShowDiv] = useState(false);
  const [showProfDiv, setShowProfDiv] = useState(false);
  const loginShow = useSelector((state) => state.loginShow)
  const signupShow = useSelector((state) => state.signupShow);
  const dispatch = useDispatch();
  return (
    <div
      className="wrapper unselectable"
      onClick={(e) => {
        e.stopPropagation();
        setShowDiv(false);
        setShowProfDiv(false);
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
            {!session && (
              <>
                <li>
                  <button
                    className="login"
                    onClick={(e) =>{
                      if(!loginShow) dispatch(toggle())
                    }}
                  >
                    Log in
                  </button>
                </li>
                <li>
                  <button
                    to="/sign-up"
                    className="signup"
                    onClick={(e) =>{
                      if(!signupShow) dispatch(toggleSignup())
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
              <div>
                {session && session.username}
              </div>
            </li>
          </div>
          {showProfDiv && (
            <div
              className="profileDrop"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {session && <LogoutButton />}
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
