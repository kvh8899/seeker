import { toggleLogin, toggleSignup } from "../../store/toggles";
import { useSelector, useDispatch } from "react-redux";
function RightNav({showProfDiv,setShowProfDiv}) {
  const loginShow = useSelector((state) => state.loginShow);
  const session = useSelector((state) => state.session.user);
  const signupShow = useSelector((state) => state.signupShow);
  const dispatch = useDispatch();
  return (
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
  );
}

export default RightNav