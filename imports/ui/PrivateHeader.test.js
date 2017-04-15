import expect from "expect";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";
import React from "react";

import { PrivateHeader } from "./PrivateHeader";

if (Meteor.isClient) {
    describe("PrivateHeader", function () {
        it("should set button test to logout", function () {
            const title = "Test Title"
            const wrapper = mount(<PrivateHeader title={title} onLogout={() => {}}/>);
            const buttonText = wrapper.find("button").text();
            expect(buttonText).toBe("Logout");
        });


        it("should set title prop as h1 text", function () {
            const title = "Test Title"
            const wrapper = mount(<PrivateHeader title={title} onLogout={() => {}}/>);
            const headerText = wrapper.find("h1").text();
            expect(headerText).toBe(title);
        });


        it("should call the function", function () {
            const spy = expect.createSpy();
            spy(3);
            expect(spy).toHaveBeenCalled();
        });


        it("should call onLogout on button click", function () {
            const title = "Test Title"
            const spy = expect.createSpy();
            const wrapper = mount(<PrivateHeader title={title} onLogout={spy}/>);
            const buttonText = wrapper.find("button").simulate("click");
            expect(spy).toHaveBeenCalled();
        });

    });
}
