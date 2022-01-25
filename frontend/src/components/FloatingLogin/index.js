import { useDispatch } from "react-redux";
import { toggleLogin } from "../../store/toggles";
import { toggleSignup } from "../../store/toggles";
import { login } from "../../store/session";
import React, { useState, useRef, useEffect} from 'react';
import "./floatinglogin.css";
function FloatingLogin() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const labeluser = useRef(null);
  const labelpass = useRef(null);
  useEffect(() => {
    if(username){
      labeluser.current.classList.add("labelChange")
    }else{
      labeluser.current.classList.remove("labelChange")
    }
    if(password){
      labelpass.current.classList.add("labelChange");
    }else{
      labelpass.current.classList.remove("labelChange")
    }
  },[username,password])
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
      return;
    }
    dispatch(toggleLogin());
  };
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <div className="loginForm">
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(toggleLogin());
          }}
        ></div>
        <div className="outer">
          <div className="side"></div>
          <div>
            <div className="loginDiv">
              <p>Login</p>
              <button
                onClick={async (e) => {
                  const res = await dispatch(login("Demo", "password"));
                  if(!res){
                    dispatch(toggleLogin());
                  }
                }}
              >
                Demo Login
              </button>
              <div className="divider">
                <div></div> <p>OR</p> <div></div>
              </div>
              <form onSubmit={onLogin}>
                <div>
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
                <div>
                  <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={updateUsername}
                  />
                  <label ref={labeluser} className="username">
                    Username
                  </label>
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={updatePassword}
                  />
                  <label ref={labelpass} className="password">
                    Password
                  </label>
                </div>
                <button type="submit">Login</button>
              </form>
              <div className="signlink">
                {/*if time do routes properly */}
                New to Guardian?{" "}
                <a
                  href="/signup"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(toggleLogin());
                    dispatch(toggleSignup());
                  }}
                >
                  SignUp
                </a>
              </div>
            </div>
          </div>
          <div className="span"></div>
          <button
            id="exit"
            onClick={(e) => {
              dispatch(toggleLogin());
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
