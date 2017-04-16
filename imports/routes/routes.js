import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Tracker } from "meteor/tracker";

import Signup from "../ui/Signup";
import Dashboard from "../ui/Dashboard";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";


const protectedPage = ["/dashboard"];
const loginPage = ["/", "/signup"];

function onEnterLoginPage () {
  if (Meteor.userId()) browserHistory.replace("/dashboard");
}

function onEnterPrivatePage () {
  if (!Meteor.userId()) browserHistory.replace("/");
}

function onEnterNotePage (nextState) {
  if (!Meteor.userId()) browserHistory.replace("/");

  Session.set("selectedNoteId", nextState.params.id);
}

// export function onAuthChange (isAuthenticated) {
export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const onProtectedPage = protectedPage.includes(pathname);
  const onLoginPage = loginPage.includes(pathname);

  if (onProtectedPage && !isAuthenticated) {
    browserHistory.replace("/");
  } else if (onLoginPage && isAuthenticated) {
    browserHistory.replace("/dashboard");
  }
    
}

export const routes = (
  <Router history={browserHistory}>
    <Route exact path="/" component={Login} onEnter={onEnterLoginPage} />
    <Route path="/login" component={Login} onEnter={onEnterLoginPage} />
    <Route path="/signup" component={Signup}/>
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage} />
    <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage} />
    <Route path="*" component={NotFound}/>
  </Router>
);
