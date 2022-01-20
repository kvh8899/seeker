import Nav from "../Nav";
import "./mainpage.css";
import { useSelector } from "react-redux";
import FloatingLogin from "../FloatingLogin";
import FloatingSignup from "../FloatingSignup";
function MainPage() {
  const loginShow = useSelector((state) => state.loginShow);
  const signupShow = useSelector((state) => state.signupShow);
  return (
    <div className="mainContent">
      {loginShow && <FloatingLogin />}
      {signupShow && <FloatingSignup/>}
      <Nav />
      <div className="midContent">
        <div className="postContent">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="sideBar"></div>
      </div>
    </div>
  );
}

export default MainPage;
