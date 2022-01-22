import { useDispatch, useSelector } from "react-redux";
import { toggleEditPage } from "../../store/toggles";
import { editCurrentPage } from "../../store/currentPage";
import { deletePage } from "../../store/pages";
import { useHistory } from "react-router-dom";
import { useState } from "react";
function EditPage() {
  const dispatch = useDispatch();
  const hist = useHistory();
  const [profile_image, setProfile_image] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const currentPage = useSelector((state) => state.currentPage);
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
            await dispatch(
              editCurrentPage(currentPage.id, {
                profile_image,
                theme,
                description,
              })
            );
            dispatch(toggleEditPage());
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
          <label>Description</label>
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
              await dispatch(deletePage(currentPage.id))
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
