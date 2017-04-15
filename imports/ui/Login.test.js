import expect from "expect";
import { Meteor } from "meteor/meteor";
import { mount } from "enzyme";
import React from "react";

import { Login } from "./Login";

if (Meteor.isClient) {
    describe("Login", function () {
        it("should show error messages", function () {
            const error = "This is an error";
            const wrapper = mount(<Login loginWithPassword={() => {}}/>);
            wrapper.setState({ error });

            let pText = wrapper.find("p").text();
            expect(pText).toBe(error);

            wrapper.setState({ error: "" });
            pText = wrapper.find("p");
            expect(pText.length).toBe(0);
        });


        it("should call loginWithPassword with the form data", function () {
            const email = "j@j.com";
            const password = "password123";
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy}/>);

            wrapper.ref("email").node.value = email;
            wrapper.ref("password").node.value = password;
            wrapper.find("form").simulate("submit");

            expect(spy.calls[0].arguments[0]).toBe(email);
            expect(spy.calls[0].arguments[1]).toBe(password);
        });


        it("should set loginWithPassword callback errors", function () {
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy}/>);

            wrapper.find("form").simulate("submit");

            spy.calls[0].arguments[2]({});
            expect(wrapper.state("error").length).toNotBe(0);

            spy.calls[0].arguments[2]();
            expect(wrapper.state("error").length).toBe(0);
        });

    });
}
