import { useSelector, useDispatch } from "react-redux";
import { fetchUserList } from "../../store/pages";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import "./nav.css";
import { useState, useEffect, useRef } from "react";
function Nav({ name, icon }) {
  const session = useSelector((state) => state.session.user);
  const [showDiv, setShowDiv] = useState(false);
  const [names, setName] = useState(name);
  const [icons, setIcons] = useState(icon);
  const profileDrop = useRef(null);
  const profile = useRef(null);
  const homeBar = useRef(null);
  const dispatch = useDispatch();

  async function loadData() {
    await dispatch(fetchUserList(session.id));
  }

  useEffect(() => {
    //temporary fix to divs not closing, must use redux instead
    function close(e) {
      if (homeBar.current) {
        homeBar.current.classList.add("displayNun");
        homeBar.current.classList.remove("comBar");
      }
      document.querySelector(".home")?.classList.remove("border");
      if (profileDrop.current) {
        profileDrop.current.classList.add("displayNun");
        profileDrop.current.classList.remove("profileDrop");
      }
      if (profile.current) {
        profile.current.classList.remove("profileStick");
      }
    }
    document.body.addEventListener("click", close);
    setName(name);
    setIcons(icon);
    return () => {
      document.body.removeEventListener("click", close);
    };
  }, [name, icon]);

  useEffect(() => {
    if (session) loadData();
  }, [session]);

  return (
    <div
      className="wrapper unselectable"
      onClick={(e) => {
        setShowDiv(false);
      }}
    >
      <nav>
        <ul className="mainNav">
          <LeftNav
            icon={icons}
            name={names}
            setName={setName}
            setIcons={setIcons}
            homeBar={homeBar}
          />
          <RightNav
            setName={setName}
            setIcons={setIcons}
            showDiv={showDiv}
            setShowDiv={setShowDiv}
            profileDrop={profileDrop}
            profile={profile}
          />
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
