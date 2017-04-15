import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from 'meteor/meteor';
import React from "react";

import { Notes } from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from "./NoteListEmptyItem";

export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader/>
            { !!props.notes.length ? renderNoteList(props.notes) : <NoteListEmptyItem/> }
            NoteList { props.notes.length }
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