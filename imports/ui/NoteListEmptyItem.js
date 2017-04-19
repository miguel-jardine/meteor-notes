import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from 'meteor/meteor';
import React from "react";


// Presentational Component (aka Stateless Functional Component)
//      - Faster than a React.Component
//      - Does not need to manipulate state
//      - Does not need to make database calls.
// --------------------------------------------------
// export default () => {
export const NoteListEmptyItem = () => {
    return (
        <div className="empty-item" >
            Create a note to get started.
        </div>
    );
}

export default NoteListEmptyItem;

// export default createContainer(() => {
//     return {
//         meteorCall: Meteor.call
//     };
// }, NoteListHeader);
