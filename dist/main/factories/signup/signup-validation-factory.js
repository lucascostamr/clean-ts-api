"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpValidation = void 0;
const validation_1 = require("../../../presentation/helpers/validation");
const email_validator_adapter_1 = require("../../adapters/validators/email-validator-adapter");
const makeSignUpValidation = () => {
    const validations = [];
    for (const field of ['email', 'name', 'password', 'passwordConfirmation']) {
        validations.push(new validation_1.RequiredFieldValidation(field));
    }
    validations.push(new validation_1.CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new validation_1.EmailValidation('email', new email_validator_adapter_1.EmailValidatorAdapter()));
    return new validation_1.ValidationComposite(validations);
};
exports.makeSignUpValidation = makeSignUpValidation;
