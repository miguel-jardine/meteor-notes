import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from 'meteor/meteor';
import React from "react";


// Presentational Component (aka Stateless Functional Component)
//      - Faster than a React.Component
//      - Does not need to manipulate state
//      - Does not need to make database calls.
// --------------------------------------------------
export const NoteListHeader = (props) => {
// --------------------------------------------------
    return (
        <div>
            <button onClick={() => { handleClick(props) }}>Create Note</button>
        </div>
    );
}


const handleClick = (props) => {  
    props.meteorCall("notes.insert");
}


NoteListHeader.propType = {
    meteorCall: React.PropTypes.func.isRequired
}


export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    };
}, NoteListHeader);
