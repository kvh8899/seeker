import Communities from "./communities";
import styled from "styled-components";
import CurrentSelect from "./currentSelect";

const Sidebar = styled.div`
  margin-left: 30px;
  width: 475px;
`;

const StickyDiv = styled.div`
  position: sticky;
  top: 75px;
  height: 275px;
`;
function SideBar({ icon, name }) {
  return (
    <>
      <Sidebar>
        <Communities />
        <StickyDiv>
          <CurrentSelect icon={icon} name={name} />
        </StickyDiv>
      </Sidebar>
    </>
  );
}

export default SideBar;
