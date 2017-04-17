import { browserHistory } from "react-router";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import React from "react";

import { Notes } from "../api/notes";

export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: ""
        };
    }


    handleTitleChange(e) {
        const title = e.target.value;
        this.setState({ title });
        this.props.call("notes.update", this.props.note._id, { title });
    }


    handleBodyChange(e) {
        const body = e.target.value;
        this.setState({ body });
        this.props.call("notes.update", this.props.note._id, { body });
    }


    handleRemoval(e) {
        this.props.call("notes.remove", this.props.note._id);
        this.props.browserHistory.push("/dashboard");
    }


    componentDidUpdate (prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const lastNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId !== lastNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        }
    }


    render() {
        if (this.props.note) {
            return (
                <div>
                    {this.props.note._id}
                    <div id="editor">
                        <input type="text" name="title" placeholder="Note title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
                        <textarea name="editor" cols="30" rows="10" placeholder="Type your note here." value={this.state.body} onChange={this.handleBodyChange.bind(this)} ></textarea>
                        <button onClick={this.handleRemoval.bind(this)}>Delete Note</button>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <p id="message">{this.props.selectedNoteId ? "Note not found." : "Pick or create a note to get started."}</p>
                </div>
            );
        }
    }
};


Editor.propTypes = {
    browserHistory: React.PropTypes.object.isRequired,
    call: React.PropTypes.func.isRequired,
    note: React.PropTypes.object,
    selectedNoteId: React.PropTypes.string
};



export default createContainer(() => {
    const selectedNoteId = Session.get("selectedNoteId");
    // Meteor.subscribe("notes");

    return {
        browserHistory: browserHistory,
        call: Meteor.call,
        note: Notes.findOne(selectedNoteId),
        selectedNoteId,
    };
}, Editor);
