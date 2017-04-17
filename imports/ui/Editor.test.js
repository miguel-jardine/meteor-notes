import expect from "expect";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";
import React from "react";

import { Editor } from "./Editor";
import { notes } from "../fixtures/fixtures";


if (Meteor.isClient) {
    describe("Editor", function () {
        let browserHistory = { push: expect.createSpy() };
        let call = expect.createSpy();

        it("should render message that note wasn't found", function () {
            const wrapper = mount(<Editor browserHistory={browserHistory} call={call} note={undefined} selectedNoteId="noteId"/>);
            let messageText = wrapper.find("#message").text();

            expect(messageText).toBe("Note not found.");
        });

        it("should render message about how to start", function () {
            const wrapper = mount(<Editor browserHistory={browserHistory} call={call} note={undefined}/>);
            let messageText = wrapper.find("#message").text();

            expect(messageText).toBe("Pick or create a note to get started.");
        });


        it("should remove a note", function () {
            const wrapper = mount(<Editor browserHistory={browserHistory} call={call} note={notes[0]}/>);
            wrapper.find("button").simulate("click");

            expect(browserHistory.push).toHaveBeenCalledWith("/dashboard");
            expect(call).toHaveBeenCalledWith("notes.remove", notes[0]._id);
        });


        it("should update the note body", function () {
            const newBody = "New body as of 4-17-17";
            const wrapper = mount(<Editor browserHistory={browserHistory} 
                                          call={call} 
                                          note={notes[0]} 
                                          selectedNoteId={notes[0]._id}/>);

            wrapper.find("textarea").simulate("change", {
                target: {
                    value: newBody
                }
            });

            expect(wrapper.state("body")).toBe(newBody);
            expect(call).toHaveBeenCalledWith("notes.update", notes[0]._id, { body: newBody });
        });

        
        it("should update the note title", function () {
            const newTitle = "New body as of 4-17-17";
            const wrapper = mount(<Editor browserHistory={browserHistory} 
                                          call={call} 
                                          note={notes[0]} 
                                          selectedNoteId={notes[0]._id}/>);

            wrapper.find("input").simulate("change", {
                target: {
                    value: newTitle
                }
            });

            expect(wrapper.state("title")).toBe(newTitle);
            expect(call).toHaveBeenCalledWith("notes.update", notes[0]._id, { title: newTitle });
        });

        
        it("should set state for a new note", function () {
            const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);
            wrapper.setProps({
                note: notes[0],
                selectedNoteId: notes[0]._id,
            });
            const stateTitle = wrapper.state("title");
            const stateBody = wrapper.state("body");
            
            expect(stateTitle).toBe(notes[0].title);
            expect(stateBody).toBe(notes[0].body);
        });


        it("should not set state if note prop not provided", function () {
            const wrapper = mount(<Editor browserHistory={browserHistory} call={call}/>);
            wrapper.setProps({
                selectedNoteId: notes[0]._id,
            });
            const stateTitle = wrapper.state("title");
            const stateBody = wrapper.state("body");
            
            expect(stateTitle).toBe("");
            expect(stateBody).toBe("");
        });
    });
}
