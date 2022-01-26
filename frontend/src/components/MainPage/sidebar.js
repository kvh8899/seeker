import Communities from "./communities";
import CurrentSelect from "./currentSelect";
import styled from "styled-components";

const Sidebar = styled.div`
  margin-left: 30px;
  width: 475px;
`;

function SideBar() {
  return (
    <>
      <Sidebar>
        <Communities />
        <CurrentSelect />
      </Sidebar>
    </>
  );
}

export default SideBar;
