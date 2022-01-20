import Nav from "../Nav";
import "./mainpage.css";
import { useSelector } from "react-redux";
import FloatingLogin from "../FloatingLogin";
import FloatingSignup from "../FloatingSignup";
import CreatePage from "../CreatePage";
function MainPage() {
  const loginShow = useSelector((state) => state.loginShow);
  const signupShow = useSelector((state) => state.signupShow);
  const createPageShow = useSelector((state) => state.createPageShow)
  return (
    <div className="mainContent">
      <Nav />
      {loginShow && <FloatingLogin />}
      {signupShow && <FloatingSignup/>}
      {/*createPageShow && <CreatePage />*/}
      {createPageShow && <CreatePage />}
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
