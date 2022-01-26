import Communities from "./communities";
import CurrentSelect from "./currentSelect";
import styled from "styled-components";
function SideBar() {
  const SideBar = styled.div`
    margin-left: 30px;
    width: 475px;
    height:100%;
  `;
  return (
    <SideBar>
      <Communities />
      <CurrentSelect />
    </SideBar>
  );
}

export default SideBar;
