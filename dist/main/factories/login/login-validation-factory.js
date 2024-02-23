"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoginValidation = void 0;
const validation_1 = require("../../../presentation/helpers/validation");
const email_validator_adapter_1 = require("../../adapters/validators/email-validator-adapter");
const makeLoginValidation = () => {
    const validations = [];
    for (const field of ['email', 'password']) {
        validations.push(new validation_1.RequiredFieldValidation(field));
    }
    validations.push(new validation_1.EmailValidation('email', new email_validator_adapter_1.EmailValidatorAdapter()));
    return new validation_1.ValidationComposite(validations);
};
exports.makeLoginValidation = makeLoginValidation;
