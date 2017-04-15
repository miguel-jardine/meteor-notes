import expect from "expect";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";
import React from "react";

import { NoteList } from "./NoteList";

const notes = [
    {
        _id: "testNoteId1",
        title: "testTitle1",
        body: "testBody1",
        userId: "testUserId1",
        updatedAt: 0
    },
    {
        _id: "testNoteId2",
        title: "testTitle2",
        body: "testBody2",
        userId: "testUserId1",
        updatedAt: 0
    },
];

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
