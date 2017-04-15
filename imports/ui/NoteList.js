import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from 'meteor/meteor';
import React from "react";

import { Notes } from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";

export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader/>
            NoteList { props.notes.length }
            { renderNoteList(props.notes) }
        </div>
    );
}


const renderNoteList = (notes) => {
    return notes.map((note) => {
        return <NoteListItem key={note._id} note={note}/>
    });
}


NoteList.propType = {
    notes: React.PropTypes.array.isRequired
}


export default createContainer(() => {
    Meteor.subscribe("notes");

    return {
        notes: Notes.find().fetch()
    }

}, NoteList);