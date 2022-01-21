import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import SignUpForm from "../auth/SignUpForm";
import { toggleSignup } from "../../store/toggles";
import { toggleLogin } from "../../store/toggles";
function FloatingSignup() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="loginForm">
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(toggleSignup());
          }}
        ></div>
        <div className="outer">
          <div className="side"></div>
          <div>
            <div className="loginDiv">
              <p>Sign Up</p>
              <button
                onClick={async (e) => {
                  const res = await dispatch(login("Demo", "password"));
                  if (!res) {
                    dispatch(toggleSignup());
                  }
                }}
              >
                Demo Login
              </button>
              <div className="divider">
                <div></div> <p>OR</p> <div></div>
              </div>
              <SignUpForm />
              <div className="signlink">
                {/*if time do routes properly */}
                Have an account?{" "}
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(toggleLogin());
                    dispatch(toggleSignup());
                  }}
                >
                  Login
                </a>
              </div>
            </div>
          </div>
          <div className="span"></div>
          <button
            id="exit"
            onClick={(e) => {
              dispatch(toggleSignup());
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default FloatingSignup;
