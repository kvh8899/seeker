import styled from "styled-components";
const Settings = styled.button`
  background-color: transparent;
  border: none;
  font: inherit;
  color: inherit;
  transition: 0s;
`;
function UserSettingsButton() {
  return <Settings>User Settings</Settings>;
}

export default UserSettingsButton;
