import React from "react";
import { browserHistory } from "react-router";
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";

// Presentational Component (aka Stateless Functional Component)
//      - Faster than a React.Component
//      - Does not need to manipulate state
//      - Does not need to make database calls.
// --------------------------------------------------
export const PrivateHeader = props => {
// --------------------------------------------------
    return (
        <div className="header">
            <div className="header__content">
                <h1 className="header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={props.onLogout}>Logout</button>
            </div>
        </div>
    )
}

// --------------------------------------------------
const onLogout = () => {
// --------------------------------------------------
    Meteor.logout();
    console.log("Logged out:", Meteor.user().emails[0].address);
    browserHistory.push("/");
}


PrivateHeader.protoTypes = {
    title: React.PropTypes.string.isRequired,
    onLogout: React.PropTypes.func.isRequired
}

export default createContainer(() => {
    // debugger;
    return {
        // title: props.title || "Run Away, Bitch!",
        onLogout: onLogout
    }
}, PrivateHeader);
