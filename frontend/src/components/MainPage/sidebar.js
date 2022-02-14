import Communities from "./communities";
import CurrentSelect from "./currentSelect";
import styled from "styled-components";

const Sidebar = styled.div`
  margin-left: 30px;
  width: 475px;
  height: 800px;
`;

function SideBar({icon,name}) {
  return (
    <>
      <Sidebar>
        <Communities />
        <CurrentSelect icon={icon} name={name}/>
      </Sidebar>
    </>
  );
}

export default SideBar;
