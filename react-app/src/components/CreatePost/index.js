import "./createpost.css";
import Nav from "../Nav";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserList } from "../../store/pages";
import { useState } from "react";
import FloatingLogin from "../FloatingLogin";
import FloatingSignup from "../FloatingSignup";
import CreatePage from "../CreatePage";
import PostPage from "../PostPage";
import CpForm from "./CpForm";
import {
  togglePageSelect,
  togglePageOff,
  togglePageOn,
} from "../../store/toggles";

function CreatePost() {
  const session = useSelector((state) => state.session.user);
  const userPages = useSelector((state) => state.pageList);
  const tpSelect = useSelector((state) => state.pageSelect);
  const dispatch = useDispatch();
  const [currPage, setCurrPage] = useState("");
  const [currId, setCurrId] = useState(null);
  const [errors, setErrors] = useState([]);

  async function loadData() {
    await dispatch(fetchUserList(session.id));
  }

  function subString(str) {
    if (!currPage) return;
    str = str.toLowerCase();
    let curr = currPage.toLowerCase();
    return str.indexOf(curr) > -1 ? true : false;
  }

  useEffect(() => {
    loadData();
    function el(e) {
      dispatch(togglePageOff());
    }
    document.body.addEventListener("click", el);
    return () => {
      document.body.removeEventListener("click", el);
    };
  }, []);
  const loginShow = useSelector((state) => state.loginShow);
  const signupShow = useSelector((state) => state.signupShow);
  const createPageShow = useSelector((state) => state.createPageShow);
  const postPageShow = useSelector((state) => state.postPageShow);
  return (
    <div className="mainContent mainContentScroll">
      {loginShow && <FloatingLogin />}
      {signupShow && <FloatingSignup />}
      {createPageShow && <CreatePage />}
      {postPageShow && <PostPage />}
      <Nav icon={<i className="fas fa-plus"></i>} name={"Create Post"} />
      <div className="midContent">
        <div className="cPostForm">
          <h2>Create a Post</h2>
          <div className="divider"></div>
          <div id="ead" style={{ display: "flex" }}>
            <div
              className="dropDown"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <input
                placeholder="Choose a Community"
                value={currPage}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(togglePageOn());
                }}
                onChange={(e) => {
                  setCurrPage(e.target.value);
                }}
              ></input>
              <div
                className="dropDownButton"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(togglePageSelect());
                }}
              >
                <i className="fas fa-angle-down"></i>
              </div>
              {tpSelect && (
                <div className="pageList">
                  {userPages.map((ex) => {
                    if (currPage && !subString(ex.title)) return "";
                    return (
                      <div
                        className="comContainer ccOff"
                        id={ex.id}
                        key={ex.id}
                        onClick={(e) => {
                          dispatch(togglePageSelect());
                          setCurrPage(ex.title);
                          setCurrId(ex.id);
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
              )}
            </div>
            {errors.length ? (
              <div>
                <p>Please Select a Community</p>
              </div>
            ):""}
          </div>
          <CpForm currPage={currPage} currId={currId} setErrors={setErrors} />
        </div>
        <div className="sideBar"></div>
      </div>
    </div>
  );
}

export default CreatePost;
