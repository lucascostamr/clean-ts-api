"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const adaptRoute = (controller) => {
    return async (req, res) => {
        const httpRequest = {
            body: req.body
        };
        const httpResponse = await controller.handle(httpRequest);
        if (httpResponse.statusCode === 500) {
            res.status(httpResponse.statusCode).json(httpResponse.body.message);
            return;
        }
        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
exports.adaptRoute = adaptRoute;
