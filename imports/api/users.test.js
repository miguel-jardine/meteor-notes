import expect from "expect";
import { Meteor } from "meteor/meteor";

import { validateNewUser } from "./users";

if (Meteor.isServer) {
    describe("users", function () {
        it("should allow valid email address", function () {
            const testUser = {
                emails: [
                    {
                        address: "test@example.com"
                    }
                ]
            };

            let test = validateNewUser(testUser);
            expect(test).toBe(true);
        });

        it("should reject invalid email address", function () {
            const testUser = {
                emails: [
                    {
                        address: "t@"
                    }
                ]
            };

            expect(() => {
                validateNewUser(testUser);
            }).toThrow();
        });
    });
}
    

// const add = (a, b) => {
//     if (typeof b !== "number")
//         return a + a;

//     return a + b;
// }

// const square = a => a * a;


// describe("add tests", function () {
//     it("should add two numbers", function () {
//         let test = add(4, 1);
//         expect(test).toBe(5);
//     });

//     it("should double a number", function () {
//         let test = add(4);
//         expect(test).toBe(8);
//     });
// });

// describe("square tests", function () {
//     it("should square a number", function () {
//         let test = square(3);
//         expect(test).toBe(9);
//     });
// });  


// // it("should fail", function () { throw new Error("...because I said so.")});
