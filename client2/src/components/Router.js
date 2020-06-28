import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../routes/Main";
import QnA from "../routes/QnA";
import RegisterForm from "./RegistForm";
import Contact from "./Contact";
import Intro from "../routes/Intro";
import UserInfo from "../routes/UserInfo";
import Find from "../components/Findpw";
import Search from "../routes/Search";
import Header from "../components/Header";

//react-router-dom을 통해 경로에 따른 렌더링을 해주는 라우터입니다.
//헤더는 index페이지와 contact페이지를 제외하고 모든 컴포넌트에서 렌더링 됩니다.
export default () => (
  <Router>
    <Route
      path={["/main", "/about", "/register", "/find", "/search", "/user"]}
      component={Header}
    />
    <Switch>
      <Route exact path="/" component={Intro} />
      <Route exact path="/main" component={Main} />
      <Route exact path="/about" component={QnA} />
      <Route exact path="/register" component={RegisterForm} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/find" component={Find} />
      <Route exact path="/search" component={Search} />
      <Route path="/user/:id" component={UserInfo} />
    </Switch>
  </Router>
);
