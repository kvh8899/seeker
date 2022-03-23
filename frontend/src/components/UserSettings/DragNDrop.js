import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faCheck } from "@fortawesome/free-solid-svg-icons";
const DropZone = styled.div`
  box-sizing: border-box;
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 5px lightgray dashed;
  margin-bottom: 20px;
`;
const ChooseFile = styled.label`
  color: white;
  color: black;
  border: none;
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
  & > input {
    padding: 1px;
  }
`;

function DragNDrop() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const onDropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = e.dataTransfer.items[0];
    if (item.kind === "file") {
      const uploadFile = item.getAsFile();

      //use regex to make sure file is an image
      setFileName(uploadFile.name);
      setFile(uploadFile);
    }
  };
  const onDragHandler = (e) => {
    e.preventDefault();
  };
  return (
    <DropZone id="drop-zone" onDrop={onDropHandler} onDragOver={onDragHandler}>
      {!fileName ? (
        <div>
          <p>
            <FontAwesomeIcon icon={faFileArrowUp} /> Drag and Drop Files Here
          </p>
          <p>or</p>
          <ChooseFile htmlFor="file-upload" className="custom-file-upload">
            <input
              id="file-upload"
              type="file"
              onChange={(e) => {
                const event = e.target;
                setFileName(event.value);
                if (e.files) setFile(event.files[0]);
              }}
              style={{ border: "none" }}
            ></input>
          </ChooseFile>
        </div>
      ) : (
        <div>
          <div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div>{fileName}</div>
        </div>
      )}
    </DropZone>
  );
}

export default DragNDrop;
