import { useDispatch, useSelector } from "react-redux";
import { toggleEditPage } from "../../store/toggles";
import { editCurrentPage } from "../../store/currentPage";
import { deletePage } from "../../store/pages";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./editpage.css";
function EditPage() {
  const dispatch = useDispatch();
  const hist = useHistory();
  const currentPage = useSelector((state) => state.currentPage);
  const [profile_image, setProfile_image] = useState(currentPage.profile_image);
  const [theme, setTheme] = useState(currentPage.theme);
  const [description, setDescription] = useState(currentPage.description);
  const [errors, setErrors] = useState([]);
  return (
    <div className="editPage">
      <button
        onClick={(e) => {
          dispatch(toggleEditPage());
        }}
      >
        <i className="fas fa-times"></i>
      </button>
      <div>
        <h2>Edit Community Details</h2>
        <form
          id="editPageForm"
          onSubmit={async (e) => {
            e.preventDefault();
            const errors = await dispatch(
              editCurrentPage(currentPage.id, {
                profile_image,
                theme,
                description,
              })
            );
            if (!errors.length) {
              dispatch(toggleEditPage());
            } else {
              setErrors(errors);
            }
          }}
        >
          <label>Profile Image</label>
          <input
            value={profile_image}
            onChange={(e) => {
              setProfile_image(e.target.value);
            }}
          ></input>
          <label>Theme</label>
          <input
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value);
            }}
          ></input>
          <div style={{ display: "flex" }}>
            <label>Description</label>
            {errors.length ? (
              <p style={{ margin: "0px 5px", color: "red" }}>cannot be empty</p>
            ) : (
              ""
            )}
          </div>

          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </form>
        <div className="epfbuttons">
          <button
            className="delete"
            onClick={async (e) => {
              dispatch(toggleEditPage());
              await dispatch(deletePage(currentPage.id));
              hist.push("/");
            }}
          >
            DELETE
          </button>
          <div>
            <button
              className="cancel"
              onClick={(e) => {
                dispatch(toggleEditPage());
              }}
            >
              Cancel
            </button>
            <button className="submit" form="editPageForm">
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
