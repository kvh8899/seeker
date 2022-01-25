import Communities from "./communities";
import styled from "styled-components";
function SideBar() {
  const SideBar = styled.div`
    margin-left: 30px;
    width: 475px;
  `;
  return (
    <SideBar>
      <Communities />
    </SideBar>
  );
}

export default SideBar;
