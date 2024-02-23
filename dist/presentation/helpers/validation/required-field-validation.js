"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredFieldValidation = void 0;
const errors_1 = require("../../errors/");
class RequiredFieldValidation {
    fieldName;
    constructor(fieldName) {
        this.fieldName = fieldName;
    }
    validate(input) {
        if (!input[this.fieldName])
            return new errors_1.MissingParamError(this.fieldName);
        return null;
    }
}
exports.RequiredFieldValidation = RequiredFieldValidation;
