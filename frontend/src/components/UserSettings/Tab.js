import styled from "styled-components";
const TabSelector = styled.div`
  margin: 40px 140px;
  border-bottom: 1px solid rgb(230, 230, 230);
  display: flex;
  & > div {
    margin: 0px 15px;
    border-bottom: 2px solid transparent;
    height: 25px;
  }
  & > div > p {
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;
    margin: 0px;
  }
`;
function Tab() {
  return (
    <TabSelector>
      <div>
        <p>Profile</p>
      </div>
      <div>
        <p>Account</p>
      </div>
    </TabSelector>
  );
}

export default Tab;
