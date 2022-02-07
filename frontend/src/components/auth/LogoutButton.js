import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
const LogoutButton = ({ setShowDiv }) => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    setShowDiv(false);
    await dispatch(logout());
  };

  return (
    <button
      onClick={onLogout}
      style={{
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      <i className="fas fa-sign-out-alt"></i> Logout
    </button>
  );
};

export default LogoutButton;
