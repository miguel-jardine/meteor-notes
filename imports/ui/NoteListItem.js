import { createContainer } from "meteor/react-meteor-data";
import moment from "moment";
import React from "react";
import { Session } from "meteor/session";


export const NoteListItem = (props) => {
    return (
        <div onClick={ () => { handleClick(props) }}>
            <h5>{ props.note.title || "Untitled Note" }</h5>
            <p>{ props.note.selected ? "selected" : undefined }</p>
            <p>{ moment(props.note.updatedAt).format("M/DD/YY H:mm a") }</p>
        </div>
    )
}


const handleClick = (props) => {
    props.Session.set("selectedNoteId", props.note._id);
}


NoteListItem.propType = {
    note: React.PropTypes.object.isRequired,
    Session: React.PropTypes.object.isRequired,
}


export default createContainer(() => {
    return { 
        Session,
    };
}, NoteListItem)