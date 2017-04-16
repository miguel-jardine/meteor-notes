import expect from "expect";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";
import React from "react";

import { notes } from "../fixtures/fixtures";
import { NoteList } from "./NoteList";

if (Meteor.isClient) {
    describe("NoteList", function () {
        it("should render NoteListItem for each note", function () {
            const wrapper = mount(<NoteList notes={notes}/>);
            const itemCount = wrapper.find("NoteListItem").length;
            const emptyCount = wrapper.find("NoteListEmptyItem").length;

            expect(itemCount).toBe(2);
            expect(emptyCount).toBe(0);
        });

        it("should render NoteListEmptyItem if no notes", function () {
            const wrapper = mount(<NoteList notes={[]}/>);
            const itemCount = wrapper.find("NoteListItem").length;
            const emptyCount = wrapper.find("NoteListEmptyItem").length;

            expect(itemCount).toBe(0);
            expect(emptyCount).toBe(1);
        });
    });
}
