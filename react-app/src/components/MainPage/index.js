import Nav from "../Nav";
import "./mainpage.css";
import { useSelector } from "react-redux";
import FloatingLogin from "../FloatingLogin";
import FloatingSignup from "../FloatingSignup";
function MainPage() {
  const loginShow = useSelector((state) => state.loginShow);
  const signupShow = useSelector((state) => state.signupShow);
  return (
    <div>
      {loginShow && <FloatingLogin />}
      {signupShow && <FloatingSignup/>}
      <Nav />
    </div>
  );
}

export default MainPage;
