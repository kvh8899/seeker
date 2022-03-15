import styled from "styled-components";
import Footer from "./footer";
const Sidebar = styled.div`
  margin: 0px 30px;
  width: 475px;
`;

const StickyDiv = styled.div`
  position: sticky;
  top: 75px;
  height: 275px;
`;
function SideBar({ children }) {
  return (
    <>
      <Sidebar>
        {children}
        <StickyDiv>
          <Footer></Footer>
        </StickyDiv>
      </Sidebar>
    </>
  );
}

export default SideBar;
