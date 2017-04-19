import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from 'meteor/meteor';
import React from "react";
import { Session } from "meteor/session";


// Presentational Component (aka Stateless Functional Component)
//      - Faster than a React.Component
//      - Does not need to manipulate state
//      - Does not need to make database calls.
// --------------------------------------------------
export const NoteListHeader = (props) => {
// --------------------------------------------------
    return (
        <div className="item-list__header" >
            <button className="button" onClick={() => { handleClick(props) }}>Create Note</button>
        </div>
    );
}


const handleClick = (props) => {  
    props.meteorCall("notes.insert", (err, res) => {
        if (res) {
            props.Session.set("selectedNoteId", res);
        }
    });
}


NoteListHeader.propType = {
    meteorCall: React.PropTypes.func.isRequired,
    Session: React.PropTypes.object.isRequired
}


export default createContainer(() => {
    return {
        meteorCall: Meteor.call,
        Session
    };
}, NoteListHeader);
