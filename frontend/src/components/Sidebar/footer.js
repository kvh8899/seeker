import Card from "../MainPage/card";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 35px 15px 15px;
  font-size: 12px;
  font-family: Noto Sans, Arial, sans-serif;
  font-weight: 400;

  & > a {
    margin-top: 3px;
    margin-bottom: 3px;
    color: black;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
function Footer() {
  return (
    <Card showBanner={false}>
      <CardContainer>
        <ListContainer>
          <List>
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">
              Javascript
            </a>
            <a href="https://reactjs.org/">React</a>
            <a href="https://redux.js.org/">Redux</a>
            <a href="https://www.python.org/">Python</a>
            <a href="https://flask.palletsprojects.com/en/2.0.x/">Flask</a>
            <a href="https://www.postgresql.org/">PostgreSQL</a>
            <a href="https://styled-components.com/">Styled Components</a>
            <a href="https://www.docker.com/">Docker</a>
          </List>
          <List>
            <a href="https://kvh8899.github.io/">About</a>
            <a href="https://github.com/kvh8899">My Github</a>
            <a href="https://angel.co/u/kyle-huang-7">Angelist</a>
            <a href="https://www.linkedin.com/in/kylevhuang461/">LinkedIn</a>
          </List>
        </ListContainer>
        <List>Seeker © 2022. More Features coming Soon™</List>
      </CardContainer>
    </Card>
  );
}

export default Footer;
