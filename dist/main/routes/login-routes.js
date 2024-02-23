"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express/express-route-adapter");
const signup_factory_1 = require("../factories/signup/signup-factory");
const login_factory_1 = require("../factories/login/login-factory");
exports.default = (router) => {
    router.post('/signup', (0, express_route_adapter_1.adaptRoute)((0, signup_factory_1.makeSignUpController)()));
    router.post('/login', (0, express_route_adapter_1.adaptRoute)((0, login_factory_1.makeLoginController)()));
};
