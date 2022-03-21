import styled from "styled-components";
import { useState } from "react";
import DragNDrop from "./DragNDrop";
const CustomizeContainer = styled.div`
  margin: 0px 150px;
  width: 40%;
`;
const CustomizeProfileTitle = styled.h2`
  font-size: 19px;
  font-weight: 300;
  margin-top: 0px;
  margin-bottom: 40px;
`;
const CustomizeProfileSubTitle = styled.h3`
  color: gray;
  font-size: 12px;
  font-weight: 400;
  margin: 5px 0px;
`;
const SubTitleContainer = styled.div`
  border-bottom: 1px solid lightgray;
`;
const InputLabel = styled.h3`
  font-size: 19px;
  font-weight: 300;
  margin-top: 40px;
`;
function CustomizeProfile() {
  const [userName, setUsername] = useState("");
  const [remaining, setRemaining] = useState(30);
  return (
    <CustomizeContainer>
      <CustomizeProfileTitle>Customize Profile</CustomizeProfileTitle>
      <SubTitleContainer>
        <CustomizeProfileSubTitle>Profile Information</CustomizeProfileSubTitle>
      </SubTitleContainer>
      <div>
        <div>
          <InputLabel>Username</InputLabel>
          <input
            placeholder="Username"
            value={userName}
            onChange={(e) => {
              if (30 - e.target.value.length >= 0) {
                setUsername(e.target.value);
                setRemaining(30 - e.target.value.length);
              }
            }}
          ></input>
          <CustomizeProfileSubTitle>
            {remaining} Characters Remaining
          </CustomizeProfileSubTitle>
        </div>
        <div>
          <InputLabel>Avatar</InputLabel>
          <DragNDrop />
        </div>
      </div>
    </CustomizeContainer>
  );
}

export default CustomizeProfile;
