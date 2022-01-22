import { useDispatch } from "react-redux";
import { toggleEditPage } from "../../store/toggles";
function EditPage() {
  const dispatch = useDispatch();
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
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(toggleEditPage());
          }}
        >
          <label>Profile Image</label>
          <input></input>
          <label>Theme</label>
          <input></input>
          <label>Description</label>
          <textarea></textarea>
        </form>
        <div className="epfbuttons">
          <button
            className="delete"
            onClick={(e) => {
              dispatch(toggleEditPage());
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
