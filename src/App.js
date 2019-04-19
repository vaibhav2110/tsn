import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./history";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateProfile from "./pages/CreateProfile/Profile";
import Articles from "./pages/Articles/Articles";
import ArticleDetail from "./pages/ArticleDetail/ArticleDetail";
import CreateArticle from "./pages/CreateArticle/CreateArticle";
import EditArticle from "./pages/EditArticle/EditArticle";
import Profile from "./pages/Profile/Profile";
import ls from "local-storage";

import "./App.css";
import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <ProtectedRoute path="/" exact component={Articles} />
            <Route path="/create" exact component={CreateProfile} />
            <Route path="/create_article" exact component={CreateArticle} />
            <Route path="/article/:id" exact component={ArticleDetail} />
            <Route path="/edit_article/:id" exact component={EditArticle} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

//If user is not logged in redirect to login page
class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props;
    const user = JSON.parse(ls.get("user"));
    return (
      <Route
        {...props}
        render={props =>
          user ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
}

export default App;
