import TopBar from "../Nav";
import Tab from "./Tab";
import CustomizeProfile from "./CustomizeProfile";
import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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
  const tabMap = [true, false];
  const [tabs, setTabs] = useState(tabMap);
  const user = useSelector((state) => state.session.user);

  if (!user) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <>
      <TopBar icon={icon} name={name} />
      <ProfileFeatureContainer>
        <SettingsTitle>User Settings</SettingsTitle>
        <Tab tabs={tabs} setTabs={setTabs} />
        {tabs[0] && <CustomizeProfile />}
      </ProfileFeatureContainer>
    </>
  );
}

export default UserSettings;
