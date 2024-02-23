"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpController = void 0;
const http_helper_1 = require("../../helpers/http/http-helper");
class SignUpController {
    addAccount;
    validation;
    constructor(addAccount, validation) {
        this.addAccount = addAccount;
        this.validation = validation;
    }
    async handle(httpRequest) {
        try {
            const validationError = this.validation.validate(httpRequest.body);
            if (validationError)
                return (0, http_helper_1.badRequest)(validationError);
            const { name, password, email } = httpRequest.body;
            const account = await this.addAccount.add({
                name,
                email,
                password
            });
            return (0, http_helper_1.ok)(account);
        }
        catch (error) {
            return (0, http_helper_1.serverError)(error);
        }
    }
}
exports.SignUpController = SignUpController;
