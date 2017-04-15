import expect from "expect";
import { Meteor } from "meteor/meteor";

import { Notes } from "./notes";

if (Meteor.isServer) {
    describe("notes", function () {
        const testNote1 = {
            _id: "testNoteId1",
            title: "testTitle1",
            body: "testBody1",
            userId: "testUserId1",
            updatedAt: 0
        };

        const testNote2 = {
            _id: "testNoteId2",
            title: "testTitle2",
            body: "testBody2",
            userId: "testUserId2",
            updatedAt: 0
        };

        beforeEach(function () {
            Notes.remove({});
            Notes.insert(testNote1);
            Notes.insert(testNote2);
        })

        it("should insert new note", function () {
            const userId = "Miguel";
            const _id = Meteor.server.method_handlers["notes.insert"].apply({ userId });
            
            const test = Notes.findOne({ _id, userId });
            expect(test).toExist();
        });

        it("should not insert new note if not logged in", function () {
            expect(() => {
                Meteor.server.method_handlers["notes.insert"]();
            }).toThrow();
        });

        it("should remove note", function () {
            Meteor.server.method_handlers["notes.remove"].apply({ userId: testNote1.userId }, [testNote1._id]);
            
            const test = Notes.findOne({ _id: testNote1._id });
            expect(test).toNotExist();
        });

        it("should not remove a note if not logged in", function () {
            expect(() => {
                Meteor.server.method_handlers["notes.remove"].apply({}, [testNote1._id]);
            }).toThrow();
        });

        it("should not remove a note if invalid note id", function () {
            expect(() => {
                Meteor.server.method_handlers["notes.remove"].apply({ userId: testNote1.userId });
            }).toThrow();
        });

        it("should update title", function () {
            const updateObj = {
                title: "updated title"
            };

            Meteor.server.method_handlers["notes.update"].apply({ userId: testNote1.userId }, [testNote1._id, updateObj]);

            const test = Notes.findOne({ _id: testNote1._id });
            expect(test.updatedAt).toBeGreaterThan(0);
            expect(test).toInclude({
                title: updateObj.title,
                body: testNote1.body
            });
        });

        it("should throw error if extra paramaters provided", function () {
            const updateObj = {
                _id: "spoof_id",
                userId: "thief_user"
            };

            expect(() => {
                Meteor.server.method_handlers["notes.update"].apply({ userId: testNote1.userId }, [testNote1._id, updateObj]);
            }).toThrow();
        });

        it("should not update note if not note owner", function () {
            const updateObj = {
                title: "updated title"
            };

            const hacker = "spoof_user"; 
            Meteor.server.method_handlers["notes.update"].apply({ userId: hacker }, [testNote1._id, updateObj]);

            const test = Notes.findOne({ _id: testNote1._id });
            expect(test).toInclude(testNote1);
        });


        it("should not update note if not logged in", function () {
            const updateObj = {
                title: "updated title"
            };

            expect(() => {
                Meteor.server.method_handlers["notes.update"].apply({}, [testNote1._id, updateObj]);
            }).toThrow();
        });


        it("should not update note if invalid note id", function () {
            const updateObj = {
                title: "updated title"
            };

            const badNoteId = "bad";
            Meteor.server.method_handlers["notes.update"].apply({ userId: testNote1.userId }, [badNoteId, updateObj]);
            const test = Notes.findOne({ _id: badNoteId });
            expect(test).toNotExist();
        });

        it("should return a user's notes", function () {
            const notes = Meteor.server.publish_handlers["notes"].apply({ userId: testNote1.userId }).fetch();
            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(testNote1);
        });

        it("should return zero notes for user without notes", function () {
            const notes = Meteor.server.publish_handlers["notes"].apply({ userId: "no_author" }).fetch();
            expect(notes.length).toBe(0);
        });
    });
}