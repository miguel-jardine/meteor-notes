import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import React from "react";

import { Notes } from "../api/notes";

export class Editor extends React.Component {
    // constructor (props) {
    //     super(props);
    // }


    render () { 
        return (
            <div>
                { this.props.note._id }
                <form>
                    <input type="text" name="title"></input>
                    <textarea name="editor" cols="30" rows="10"></textarea>
                </form>
            </div>
        );
    }
}


Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string
};



export default createContainer(() => { 
    const selectedNoteId = Session.get("selectedNoteId");
    // Meteor.subscribe("notes");

    return { 
        selectedNoteId,
        note: Notes.findOne(selectedNoteId)
    };
}, Editor)