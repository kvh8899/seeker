import { useDispatch } from "react-redux";
import { toggle } from "../../store/loginShow";
import { login } from "../../store/session";
import LoginForm from "../auth/LoginForm";
import "./floatinglogin.css"
function FloatingLogin() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="loginForm">
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(toggle());
          }}
        ></div>
        <div className="outer">
          <div className="side"></div>
          <div>
            <div className="loginDiv">
              <p>Login</p>
              <button onClick={async(e) => {
                await dispatch(login("Demo","password"))
              }}>Demo Login</button>
              <div className="divider">
                <div></div> <p>OR</p> <div></div>
              </div>
              <LoginForm />
              <div className="signlink">
                New to Guardian? <a href="/signup">SignUp</a>
              </div>
            </div>
          </div>
          <div className="span"></div>
          <button
            id="exit"
            onClick={(e) => {
              dispatch(toggle());
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </>
  );
}
export default FloatingLogin;
