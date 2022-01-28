import { useDispatch } from "react-redux";
import { toggleCreatePage } from "../../store/toggles";
import { useState } from "react";
import { createPage } from "../../store/pages";
import { useHistory } from "react-router";
import "./createpage.css";
function CreatePage() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [followers_type, setFollowers_type] = useState("");
  const hist = useHistory();
  const [errors, setErrors] = useState({});
  function toggle(e) {
    dispatch(toggleCreatePage());
  }

  return (
    <>
      <div
        className="createOuter"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="blackout" onClick={toggle}></div>
        <div
          className="createPageForm"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div>
            <div className="cpHeader">
              <h4>Create a Community</h4>
              <button onClick={toggle}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form
              className="cpForm"
              id="cpForm1"
              onSubmit={async (e) => {
                e.preventDefault();
                //how to handle validations?
                const page = await dispatch(
                  createPage({ title, category, followers_type })
                );
                if (page.errors) {
                  setErrors(page.errors);
                } else {
                  toggle(e);
                  hist.push(`/pages/${page.id}`);
                }
              }}
            >
              <label>Name</label>
              <p>Community names including capitalization cannot be changed.</p>
              <p style={{ margin: "5px 0px" }}>Limit: {title.length}/50</p>
              <input
                value={title}
                onChange={(e) => {
                  if (e.target.value.length < 51) {
                    setTitle(e.target.value);
                  }
                }}
                required
              ></input>

              <div className="cpLabel">
                <label>Category</label>
              </div>
              <input
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                required
              ></input>
              <div className="cpLabel">
                <label>Choose a name for members of this group</label>
              </div>
              <input
                value={followers_type}
                onChange={(e) => {
                  setFollowers_type(e.target.value);
                }}
                required
              ></input>
            </form>
            <div className="cpSubmit">
              <div>
                <button className="cancel" onClick={toggle}>
                  Cancel
                </button>
                <button className="submit" form="cpForm1">
                  Create Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePage;
