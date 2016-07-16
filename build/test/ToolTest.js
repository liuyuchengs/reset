/// <reference path="./../../typings/index.d.ts" />
"use strict";
const chai = require("chai");
const Tool = require("./../modules/Tool");
const expect = chai.expect;
describe("Tool", () => {
    describe("add()", () => {
        it("1+1 = 2", () => {
            expect(Tool.add(1, 2)).to.equal(3);
        });
    });
    describe("enCrypt()", () => {
        it("测试加密和解密函数", () => {
        });
    });
});
//# sourceMappingURL=ToolTest.js.map