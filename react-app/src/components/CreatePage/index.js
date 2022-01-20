import { useDispatch } from "react-redux";
import { toggleCreatePage } from "../../store/createPageShow";
import "./createpage.css";
function CreatePage() {
  const dispatch = useDispatch();
  function toggle(e){
    dispatch(toggleCreatePage())
  }
  return (
    <>
      <div className="createOuter">
        <div
          className="blackout"
          onClick={toggle}
        ></div>
        <div className="createPageForm">
          <div>
            <div className="cpHeader">
              <h4>Create a Community</h4>
              <button onClick={toggle}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form className="cpForm" onSubmit={(e) => {
                e.preventDefault();
            }}>
              <label>Name</label>
              <p>Community names including capitalization cannot be changed.</p>
              <input></input>
              <div className="cpLabel">
                <label>Category</label>
              </div>
              <input></input>
              <div className="cpLabel">
                <label>Choose a name for members of this group</label>
              </div>
              <input></input>
            </form>
            <div className="cpSubmit">
              <div>
                <button className="cancel" onClick={toggle}>Cancel</button>
                <button className="submit">Create Community</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePage;
