import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import MainPage from "./components/MainPage";
import Page from "./components/Page";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/editPost";
import UserSettings from "./components/UserSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <MainPage icon={<i className="fas fa-home"></i>} name="Home" />
        </Route>
        <Route path="/pages/:id" exact={true}>
          <Page />
        </Route>
        <Route path="/posts/submit" exact={true}>
          <CreatePost />
        </Route>
        <Route path="/posts/:id/edit" exact={true}>
          <EditPost />
        </Route>
        <Route path="/all" exact={true}>
          <MainPage icon={<i className="fas fa-signal"></i>} name="All" />
        </Route>
        <Route path="/settings" exact={true}>
          <UserSettings icon={<FontAwesomeIcon icon={faUserGear}></FontAwesomeIcon>} name="Settings"></UserSettings>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
