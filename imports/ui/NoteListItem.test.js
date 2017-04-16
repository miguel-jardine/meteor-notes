import expect from "expect";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { mount } from "enzyme";
import React from "react";

import { notes } from "../fixtures/fixtures";
import { NoteListItem } from "./NoteListItem";

if (Meteor.isClient) {
    describe("NoteListItem", function () {
        let Session;

        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            };
        });

        it("should show note title and date", function () {
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);

            let h5Text = wrapper.find("h5").text();
            expect(h5Text).toBe("testTitle1");

            pText = wrapper.find("p").text();
            expect(pText).toBe("4/15/17 16:14 pm"); 
        });


        it("should show the default title when none is given", function () {
            const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>);

            let h5Text = wrapper.find("h5").text();
            expect(h5Text).toBe("Untitled Note");
        });


        it("should call set on click", function () {
            const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>);

            let divContainer = wrapper.find("div");
            divContainer.simulate("click");
            expect(Session.set).toHaveBeenCalledWith("selectedNoteId", notes[1]._id);
            
        });
    });
}
