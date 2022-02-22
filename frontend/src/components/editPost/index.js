import TopBar from "../Nav";
import EpForm from "./EpForm";

function EditPost() {
  return (
    <div className="mainContent">
      <TopBar icon={<i className="fas fa-pencil-alt"></i>} name={"Edit Post"} />
      <div className="midContent">
        <div className="cPostForm">
          <h2>Edit Post</h2>
          <div className="divider"></div>
          <div id="ead" style={{ display: "flex" }}></div>
          <EpForm />
          <span className="spacer" style={{height:"200px"}}></span>
        </div>
        <div className="sideBar"></div>
      </div>
    </div>
  );
}

export default EditPost;
