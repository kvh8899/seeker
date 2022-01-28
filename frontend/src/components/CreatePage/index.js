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
  const [errors, setErrors] = useState([]);
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
              <div style={{ display: "flex" }}>
                <label>Name</label>
                <div style={{ marginLeft: "5px", color: "red" }}>
                  {errors?.find((e) => e === "title") ? " cannot be empty" : ""}
                </div>
              </div>

              <p>Community names including capitalization cannot be changed.</p>
              <p style={{ margin: "5px 0px" }}>Limit: {title.length}/50</p>
              <input
                value={title}
                onChange={(e) => {
                  if (e.target.value.length < 51) {
                    setTitle(e.target.value);
                  }
                }}
                className={errors?.find((e) => e === "title") ? "red" : ""}
                required
              ></input>

              <div className="cpLabel">
                <div style={{ display: "flex" }}>
                  <label>Category</label>
                  <div style={{ marginLeft: "5px", color: "red" }}>
                    {errors?.find((e) => e === "category")
                      ? " cannot be empty"
                      : ""}
                  </div>
                </div>
              </div>
              <p style={{ margin: "5px 0px" }}>Limit: {category.length}/25</p>
              <input
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className={errors?.find((e) => e === "category") ? "red" : ""}
                required
              ></input>
              <div className="cpLabel">
                <div style={{ display: "flex" }}>
                  <label>Name for Members of Group</label>
                  <div style={{ marginLeft: "5px", color: "red" }}>
                    {errors?.find((e) => e === "followers_type")
                      ? " cannot be empty"
                      : ""}
                  </div>
                </div>
              </div>
              <p style={{ margin: "5px 0px" }}>
                Limit: {followers_type.length}/25
              </p>
              <input
                value={followers_type}
                onChange={(e) => {
                  setFollowers_type(e.target.value);
                }}
                className={
                  errors?.find((e) => e === "followers_type") ? "red" : ""
                }
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
