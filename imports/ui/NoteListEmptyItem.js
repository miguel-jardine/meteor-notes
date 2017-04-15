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
        <div>
            Empty note.
        </div>
    );
}

export default NoteListEmptyItem;

// export default createContainer(() => {
//     return {
//         meteorCall: Meteor.call
//     };
// }, NoteListHeader);
