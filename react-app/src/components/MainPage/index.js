import Nav from "../Nav";
import LoginForm from "../auth/LoginForm";
import "./mainpage.css";
function MainPage() {
  return (
    <div>
      <div className="blackout"></div>
      <div className="loginForm">
        <div>
          <div className="side"></div>
          <div>
            <div className="loginDiv">
              <p>Login</p>
              <button>Demo Login</button>
              <div className="divider">
                <div></div> <p>OR</p> <div></div>
              </div>
              <LoginForm />
              <div className="signlink">New to Guardian? <a href="/signup">SignUp</a></div>
            </div>
          </div>
          <div class="span"></div>
          <button id="exit"><i className="fas fa-times"></i></button>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default MainPage;
