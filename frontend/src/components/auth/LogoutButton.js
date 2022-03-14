import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import styled from "styled-components";

const LogoutButtonStyle = styled.button`
  font: inherit;
  border: none;
  background-color: transparent;
`;
const LogoutButton = ({ setShowDiv }) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    setShowDiv(false);
    await dispatch(logout());
  };

  return <LogoutButtonStyle onClick={onLogout}>Logout</LogoutButtonStyle>;
};

export default LogoutButton;
