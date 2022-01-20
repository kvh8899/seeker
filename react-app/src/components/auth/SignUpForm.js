import React, { useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { toggleSignup } from '../../store/signupShow';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const labelRef = useRef([]);
  const user = useSelector(state => state.session.user);
  const signupShow = useSelector((state) => state.signupShow)
  const dispatch = useDispatch();

  useEffect(() => {
   const inputs =  [username,password,repeatPassword]
    labelRef.current.forEach((e,i) => {
      if(inputs[i]){
        e.classList.add("labelChange");
      }else{
        e.classList.remove("labelChange");
      }
    })

  },[username,password,repeatPassword])
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, password));
      if (data) {
        setErrors(data)
      }
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

  if (user) {
    if(signupShow) dispatch(toggleSignup())
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
        <label className="username" ref={(e) => labelRef.current[0] = e}>User Name</label>
      </div>
      <div>
        
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
        <label className="password" ref={(e) => labelRef.current[1] = e }>Password</label>
      </div>
      <div>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        <label className="password" ref={(e) => labelRef.current[2] = e }>Confirm Password</label>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
