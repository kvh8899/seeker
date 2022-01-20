import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { toggle } from '../../store/loginShow';
import "./LoginForm.css"
const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const loginShow = useSelector(state => state.loginShow);
  const dispatch = useDispatch();
  const labeluser = useRef(null);
  const labelpass = useRef(null);
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data) {
      setErrors(data);
    }
  };

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
  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    if(loginShow) dispatch(toggle())
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          name='username'
          type='text'
          value={username}
          onChange={updateUsername}
        />
        <label ref={labeluser} className="username">Username</label>
      </div>
      <div>
        <input
          name='password'
          type='password'
          value={password}
          onChange={updatePassword}
        />
        <label ref={labelpass} className="password">Password</label>
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
