import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({showDiv,setShowDiv}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    setShowDiv(false)
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
