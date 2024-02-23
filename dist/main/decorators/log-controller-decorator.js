"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogControllerDecorator = void 0;
class LogControllerDecorator {
    controller;
    logErrorRepository;
    constructor(controller, logErrorRepository) {
        this.controller = controller;
        this.logErrorRepository = logErrorRepository;
    }
    async handle(httpRequest) {
        const httpResponse = await this.controller.handle(httpRequest);
        if (httpResponse.statusCode === 500)
            await this.logErrorRepository.logError(httpResponse.body.stack);
        return httpResponse;
    }
}
exports.LogControllerDecorator = LogControllerDecorator;
