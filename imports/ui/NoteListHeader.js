import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from 'meteor/meteor';
import React from "react";

export class NoteListHeader extends React.Component {
    constructor (props) {
        super(props);
    }


    render () {
        return (
            <div>
                <button onClick={this.onClick.bind(this)}>Create Note</button>
            </div>
        );
    }    

    onClick (e) {
        this.props.meteorCall("notes.insert");

    }
}


NoteListHeader.propType = {
    meteorCall: React.PropTypes.func.isRequired
}


export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    };
}, NoteListHeader);
