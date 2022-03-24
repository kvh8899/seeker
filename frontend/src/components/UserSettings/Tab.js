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
  .underline {
    border-bottom: 3px solid rgb(28, 138, 228);
  }
`;
function Tab({ tabs, setTabs }) {
  /*
    index: integer representing index of tab in array
   */
  const mapper = (index) => {
    return tabs.map((e, i) => {
      return i === index ? true : false;
    });
  };

  return (
    <TabSelector>
      <div
        onClick={(e) => {
          setTabs(mapper(0));
        }}
        className={tabs[0] ? "underline" : ""}
      >
        <p>Profile</p>
      </div>
      <div
        onClick={(e) => {
          setTabs(mapper(1));
        }}
        className={tabs[1] ? "underline" : ""}
      >
        <p>Account</p>
      </div>
    </TabSelector>
  );
}

export default Tab;
