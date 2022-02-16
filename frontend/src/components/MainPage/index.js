import "./mainpage.css";
import Posts from "../Posts";

import FooForm from "../FooForm";
import TopBar from "../Nav";
import SideBar from "./sidebar";

function MainPage({ icon, name }) {
  
  return (
    <div className="mainContent">
      <TopBar icon={icon} name={name} />
      <div className="midContent">
        <div className="postContent">
          <FooForm />
          <Posts name={name} />
          <span id="spacer"></span>
        </div>

        <SideBar icon={icon} name={name} />
      </div>
    </div>
  );
}

export default MainPage;
