import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { toggleSignup } from "../../store/toggles";
import "./errors.css";
const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const labelRef = useRef([]);
  const passWordRef = useRef(null);
  const confirmRef = useRef(null);
  const usernameRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const inputs = [username, password, repeatPassword];
    labelRef.current.forEach((e, i) => {
      if (inputs[i]) {
        e.classList.add("labelChange");
      } else {
        e.classList.remove("labelChange");
      }
    });
    if (errors.password?.length) {
      passWordRef.current.classList.add("red");
      confirmRef.current.classList.add("red");
    } else {
      passWordRef.current.classList.remove("red");
      confirmRef.current.classList.remove("red");
    }
    if (errors.username?.length) {
      usernameRef.current.classList.add("red");
    } else {
      usernameRef.current.classList.remove("red");
    }
  }, [username, password, repeatPassword, errors]);
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, password));
      if (data) {
        console.log(data);
        setErrors(data);
        return;
      }
      dispatch(toggleSignup());
    } else {
      setErrors(["Passwords do not Match"]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <form onSubmit={onSignUp}>
      {errors.username?.length && (
        <p>Username exists or is less than 3 Characters</p>
      )}
      {errors.password?.length && (
        <p>
          Password must be greater than 5 characters, contain a special
          character, and have at least 1 digit.
        </p>
      )}
      <div>
        <input
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
          ref={usernameRef}
        ></input>
        <label className="username" ref={(e) => (labelRef.current[0] = e)}>
          User Name
        </label>
      </div>
      <div>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          ref={passWordRef}
        ></input>
        <label className="password" ref={(e) => (labelRef.current[1] = e)}>
          Password
        </label>
      </div>
      <div>
        <input
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          ref={confirmRef}
        ></input>
        <label className="password" ref={(e) => (labelRef.current[2] = e)}>
          Confirm Password
        </label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
