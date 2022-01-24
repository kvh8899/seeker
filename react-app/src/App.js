import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignUpForm from "./components/auth/SignUpForm";
import { authenticate } from "./store/session";
import MainPage from "./components/MainPage";
import Page from "./components/Page";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/editPost";

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
          <MainPage />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
