import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faCheck } from "@fortawesome/free-solid-svg-icons";
const DropZone = styled.div`
  box-sizing: border-box;
  height: 300px;
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 5px lightgray dashed;
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
const Confirm = styled.p`
  color: ${(props) => props.theme.main};
`;
Confirm.defaultProps = {
  theme: {
    main: "#1A67F5",
  },
};
function DragNDrop() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const onDropHandler = (e) => {
    const item = e.dataTransfer.items[0];
    if (item.kind === "file") {
      const uploadFile = item.getAsFile();
      setFileName(uploadFile.name);
      setFile(uploadFile);
    }
  };
  const onDragHandler = (e) => {
    e.preventDefault();
  };
  return (
    <DropZone id="drop-zone" onDrop={onDropHandler} onDrag={onDragHandler}>
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
          <ThemeProvider theme={"green"}>
            <Confirm>
              <FontAwesomeIcon icon={faCheck} />
            </Confirm>
          </ThemeProvider>
          <Confirm>{fileName}</Confirm>
        </div>
      )}
    </DropZone>
  );
}

export default DragNDrop;
