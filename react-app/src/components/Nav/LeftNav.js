import { getCurrentPage } from "../../store/currentPage";
import { getPagePosts } from "../../store/posts";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useRef, useState, useEffect } from "react";
import { postPageOff, toggleCreatePage } from "../../store/toggles";

function LeftNav({ icon, name }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);
  const wrapper = useRef(null);
  const hist = useHistory();
  const [showDiv, setShowDiv] = useState(false);
  const userPages = useSelector((state) => state.pageList);

  useEffect(() => {
    //temporary fix to divs not closing, must use redux instead
    function close(e) {
      setShowDiv(false);
      document.querySelector(".home")?.classList.remove("border");
    }

    document.body.addEventListener("click", close);

    return () => {
      document.body.removeEventListener("click", close);
    };
  }, []);
  return (
    <div className="leftnav">
      <li>
        <NavLink
          to="/"
          exact={true}
          className="logo"
          onClick={(e) => {
            dispatch(postPageOff());
            //dispatch(toggleEditOff());
          }}
        >
          <img src="/Guardian.png" alt=""></img>Seeker
        </NavLink>
      </li>
      {session && (
        <div
          className="home"
          onClick={(e) => {
            e.stopPropagation();
            if (!showDiv) {
              setShowDiv(true);
              wrapper.current.classList.add("border");
            }
          }}
          ref={wrapper}
        >
          <div
            className="homeChild"
            onClick={(e) => {
              setShowDiv(false);
              wrapper.current.classList.remove("border");
            }}
          >
            <div className="tof">
              {icon} {name}
            </div>
            <div>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
          {showDiv && (
            <div className="comBar">
              <input placeholder="Filter"></input>
              <div>
                <div className="myComs">
                  <p>My Communities</p>
                </div>
                <div
                  className="createCom"
                  onClick={(e) => {
                    dispatch(toggleCreatePage());
                  }}
                >
                  <i className="fas fa-plus"></i> Create Community
                </div>
                {userPages.map((ex) => {
                  return (
                    <div
                      className="comContainer"
                      id={ex.id}
                      key={ex.id}
                      onClick={async (e) => {
                        await dispatch(getPagePosts(ex.id));
                        await dispatch(getCurrentPage(ex.id));
                        setShowDiv(false);
                        dispatch(postPageOff());
                        //dispatch(toggleEditPageOff());
                        wrapper.current.classList.remove("border");
                        hist.push(`/pages/${ex.id}`);
                      }}
                    >
                      <div className="communities">
                        <div className="comName">
                          {ex.profile_image ? (
                            <img src={ex.profile_image} alt=""></img>
                          ) : (
                            <img
                              src="https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
                              alt=""
                            ></img>
                          )}
                          <p>{ex.title}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LeftNav;
