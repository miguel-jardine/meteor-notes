import expect from "expect";
import { Meteor } from "meteor/meteor";
import moment from "moment";
import { mount } from "enzyme";
import React from "react";

import { NoteListItem } from "./NoteListItem";

if (Meteor.isClient) {
    describe("NoteListItem", function () {
        it("should show note title and date", function () {
            const title = "Test Title";
            const updatedAt = moment().valueOf();
            const note = { title, updatedAt };
            const wrapper = mount(<NoteListItem note={note}/>);

            let h5Text = wrapper.find("h5").text();
            expect(h5Text).toBe(title);

            pText = wrapper.find("p").text();
            expect(pText).toBe(moment(updatedAt).format("M/DD/YY H:mm a")); 
        });


        it("should show the default title when none is given", function () {
            const title = "Untitled Note";
            const wrapper = mount(<NoteListItem note={{}}/>);

            let h5Text = wrapper.find("h5").text();
            expect(h5Text).toBe(title);
        });


        // it("should call NoteListItemWithPassword with the form data", function () {
        //     const email = "j@j.com";
        //     const password = "password123";
        //     const spy = expect.createSpy();
        //     const wrapper = mount(<NoteListItem NoteListItemWithPassword={spy}/>);

        //     wrapper.ref("email").node.value = email;
        //     wrapper.ref("password").node.value = password;
        //     wrapper.find("form").simulate("submit");

        //     expect(spy.calls[0].arguments[0]).toBe(email);
        //     expect(spy.calls[0].arguments[1]).toBe(password);
        // });


        // it("should set NoteListItemWithPassword callback errors", function () {
        //     const spy = expect.createSpy();
        //     const wrapper = mount(<NoteListItem NoteListItemWithPassword={spy}/>);

        //     wrapper.find("form").simulate("submit");

        //     spy.calls[0].arguments[2]({});
        //     expect(wrapper.state("error").length).toNotBe(0);

        //     spy.calls[0].arguments[2]();
        //     expect(wrapper.state("error").length).toBe(0);
        // });

    });
}
