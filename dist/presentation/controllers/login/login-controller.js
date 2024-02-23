"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const http_helper_1 = require("../../helpers/http/http-helper");
class LoginController {
    validation;
    authentication;
    constructor(validation, authentication) {
        this.validation = validation;
        this.authentication = authentication;
    }
    async handle(httpRequest) {
        try {
            const validationError = this.validation.validate(httpRequest.body);
            if (validationError)
                return (0, http_helper_1.badRequest)(validationError);
            const { email, password } = httpRequest.body;
            const accessToken = await this.authentication.auth({
                email,
                password
            });
            if (!accessToken)
                return (0, http_helper_1.unauthorized)();
            return (0, http_helper_1.ok)({ accessToken });
        }
        catch (error) {
            return (0, http_helper_1.serverError)(new Error());
        }
    }
    ;
}
exports.LoginController = LoginController;
