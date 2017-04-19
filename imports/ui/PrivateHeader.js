import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import React from "react";
import { Session } from "meteor/session";


// Presentational Component (aka Stateless Functional Component)
//      - Faster than a React.Component
//      - Does not need to manipulate state
//      - Does not need to make database calls.
// --------------------------------------------------
export const PrivateHeader = (props) => {
// --------------------------------------------------
    const navImgSrc = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg";
    return (
        <div className="header">
            <div className="header__content">
                <img className="header__nav-toggle" src={navImgSrc} onClick={props.handleNavIconClick} alt="Open navigation menu"/>
                <h1 className="header__title">{props.title}</h1>
                <button className="button button--link-text" onClick={props.onLogout}>Logout</button>
            </div>
        </div>
    );
}

// --------------------------------------------------
const onLogout = () => {
// --------------------------------------------------
    Meteor.logout();
    console.log("Logged out:", Meteor.user().emails[0].address);
    browserHistory.push("/");
}


const handleNavIconClick = (e) => {
    const currentStatus = Session.get("isNavOpen");
    Session.set("isNavOpen", !currentStatus);
}


PrivateHeader.protoTypes = {
    title: React.PropTypes.string.isRequired,
    onLogout: React.PropTypes.func.isRequired,
    isNavOpen: React.PropTypes.bool.isRequired,
    handleNavIconClick: React.PropTypes.func.isRequired,
}

export default createContainer(() => {
    return {
        onLogout: onLogout,
        isNavOpen: Session.get("isNavOpen"),
        handleNavIconClick: () => Session.set("isNavOpen", !Session.get("isNavOpen")),
    }
}, PrivateHeader);
