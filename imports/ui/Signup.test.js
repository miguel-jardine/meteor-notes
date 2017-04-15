import expect from "expect";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";
import React from "react";

import { Signup } from "./Signup";

if (Meteor.isClient) {
    describe("Signup", function () {
        it("should show error messages", function () {
            const error = "This is an error";
            const wrapper = mount(<Signup createUser={() => {}}/>);
            wrapper.setState({ error });

            let pText = wrapper.find("p").text();
            expect(pText).toBe(error);

            wrapper.setState({ error: "" });
            pText = wrapper.find("p");
            expect(pText.length).toBe(0);
        });


        it("should call createUser with the form data", function () {
            const email = "j@j.com";
            const password = "password123";
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref("email").node.value = email;
            wrapper.ref("password").node.value = password;
            wrapper.find("form").simulate("submit");

            expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });


        it("should set error if short password", function () {
            const email = "j@j.com";
            const password = "12345678";
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref("email").node.value = email;
            wrapper.ref("password").node.value = password;
            wrapper.find("form").simulate("submit");

            expect(wrapper.state("error").length).toBeGreaterThan(8);
            // expect(spy.calls[0].arguments[0]).toEqual({ email, password });
        });


        it("should set createUser callback errors", function () {
            const password = "123456789";
            const reason = "This failed.";
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);

            wrapper.ref("password").node.value = password;
            wrapper.find("form").simulate("submit");

            spy.calls[0].arguments[1]();
            expect(wrapper.state("error")).toBe("");

            spy.calls[0].arguments[1]({ reason });
            expect(wrapper.state("error")).toBe(reason);
        });

    });
}
