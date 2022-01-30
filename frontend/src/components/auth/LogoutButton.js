import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router";
const LogoutButton = ({ setShowDiv }) => {
  const dispatch = useDispatch();
  const hist = useHistory();
  const onLogout = async (e) => {
    setShowDiv(false);
    await dispatch(logout());
    hist.push("/");
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
