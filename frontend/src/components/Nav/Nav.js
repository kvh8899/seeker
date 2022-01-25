import { useSelector, useDispatch } from "react-redux";
import { fetchUserList } from "../../store/pages";
import LogoutButton from "../auth/LogoutButton";
import { useEffect } from "react";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import "./nav.css";
import { useState } from "react";
function Nav({ name, icon }) {
  const session = useSelector((state) => state.session.user);
  const [showDiv, setShowDiv] = useState(false);
  const [names, setName] = useState(name);
  const [icons, setIcons] = useState(icon);
  const [showProfDiv, setShowProfDiv] = useState(false);
  const dispatch = useDispatch();

  async function loadData() {
    await dispatch(fetchUserList(session.id));
  }

  useEffect(() => {
    //temporary fix to divs not closing, must use redux instead
    function close(e) {
      setShowDiv(false);
      setShowProfDiv(false);
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
        setShowProfDiv(false);
      }}
    >
      <nav>
        <ul className="mainNav">
          <LeftNav
            icon={icons}
            name={names}
            setName={setName}
            setIcons={setIcons}
          />
          <RightNav
            showProfDiv={showProfDiv}
            setShowProfDiv={setShowProfDiv}
            setName={setName}
            setIcons={setIcons}
          />
          {showProfDiv && (
            <div
              className="profileDrop"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {session && (
                <LogoutButton showDiv={showDiv} setShowDiv={setShowDiv} />
              )}
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;