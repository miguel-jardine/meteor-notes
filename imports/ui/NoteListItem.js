import moment from "moment";
import React from "react";

export const NoteListItem = (props) => {
    // debugger;
    return (
        <div>
            <h5>{ props.note.title || "Untitled Note" }</h5>
            <p>{ moment(props.note.updatedAt).format("M/DD/YY H:mm a") }</p>
        </div>
    )
}


NoteListItem.propType = {
    note: React.PropTypes.object.isRequired
}


export default NoteListItem;