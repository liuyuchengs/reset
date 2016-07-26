/// <reference path="./../../typings/index.d.ts" />
"use strict";
const chai = require("chai");
const Tool = require("./../modules/Tool");
const expect = chai.expect;
describe("Tool", () => {
    describe("enCrypt()", () => {
        it("测试加密和解密函数", () => {
        });
    }),
        describe("initObject", () => {
            it("测试类型转换", () => {
                let dest = { name: null, age: null, color: null };
                Tool.initObject({ name: "tom", age: 12, test: 12 }, dest);
                expect(dest).to.eql({ name: "tom", age: 12, color: null });
            });
        });
});
//# sourceMappingURL=ToolTest.js.map