import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { Tracker } from "meteor/tracker";

import Signup from "../ui/Signup";
import Dashboard from "../ui/Dashboard";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";

function onEnterNotePage (nextState) {
  Session.set("selectedNoteId", nextState.params.id);
}


const onLeaveNotePage = () => {
  Session.set("selectedNoteId", undefined);
}


export const onAuthChange = (isAuthenticated, protectedPage) => {
  if (typeof protectedPage !== "boolean") return;

  if (!isAuthenticated && protectedPage) browserHistory.replace("/");
  if (isAuthenticated && !protectedPage) browserHistory.replace("/dashboard");
}


const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1];
  Session.set("protectedPage", lastRoute.protectedPage);
}


const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
}


export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route exact path="/" component={Login} protectedPage={false}/>
      <Route path="/login" component={Login} protectedPage={false}/>
      <Route path="/signup" component={Signup} protectedPage={false}/>
      <Route path="/dashboard" component={Dashboard} protectedPage={true}/>
      <Route path="/dashboard/:id" component={Dashboard} protectedPage="true" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
);
