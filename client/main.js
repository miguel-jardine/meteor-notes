import { browserHistory } from "react-router";
import React from "react";
import ReactDOM from "react-dom";
import { Session } from "meteor/session";
import { Tracker } from "meteor/tracker";

import { routes, onAuthChange} from "../imports/routes/routes";
import "../imports/startup/simple-schema-config";


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const protectedPage = Session.get("protectedPage");

  onAuthChange(isAuthenticated, protectedPage);
});


Tracker.autorun(() => {
  const selectedNoteId = Session.get("selectedNoteId");

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
    Session.set("isNavOpen", false);
  }
});


Tracker.autorun(() => {
  const isNavOpen = Session.get("isNavOpen");
  document.body.classList.toggle("is-nav-open", isNavOpen);
});


Meteor.startup(() => {
  Session.set("selectedNoteId", undefined);
  Session.set("isNavOpen", false);
  ReactDOM.render(routes, document.getElementById("app"));
});
