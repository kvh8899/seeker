import TopBar from "../Nav";
import Tab from "./Tab";
import CustomizeProfile from "./CustomizeProfile";
import styled from "styled-components";
const ProfileFeatureContainer = styled.div`
  height: 100%;
  width: 100%;
`;
const SettingsTitle = styled.h2`
  margin: 20px 150px;
  font-size: 17px;
  font-weight: 400;
`;
function UserSettings({ icon, name }) {
  return (
    <>
      <TopBar icon={icon} name={name} />
      <ProfileFeatureContainer>
        <SettingsTitle>User Settings</SettingsTitle>
        <Tab />
        <CustomizeProfile />
      </ProfileFeatureContainer>
    </>
  );
}

export default UserSettings;
