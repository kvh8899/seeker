import React from "react";
import styled from "styled-components";

const LogoutButtonStyle = styled.button`
  font: inherit;
  border: none;
  background-color: transparent;
  color: inherit;
  transition: 0s;
`;
const LogoutButton = ({ setShowDiv }) => {
  return <LogoutButtonStyle>Logout</LogoutButtonStyle>;
};

export default LogoutButton;
