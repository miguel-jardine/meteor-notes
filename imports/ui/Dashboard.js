import React from "react";

import Editor from "./Editor"
import PrivateHeader from "./PrivateHeader";
import NoteList from "./NoteList"

// Presentational Component (aka Stateless Functional Component)
//      - Faster than a React.Component
//      - Does not need to manipulate state
//      - Does not need to make database calls.
// --------------------------------------------------
export default () => {
// --------------------------------------------------
    // let title = `Dashboard Page for ${Meteor.user() ? Meteor.user().emails[0].address : null}`;
    let title = "Notes";
    
    return (
        <div>
            <PrivateHeader title={title} />
            <div className="page-content">
                <div className="page-content__sidebar">
                    <NoteList/>
                </div>
                <div className="page-content__main">
                    <Editor/>
                </div>
            </div>
        </div>
    );
}
