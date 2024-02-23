"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptAdapter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptAdapter {
    salt;
    constructor(salt) {
        this.salt = salt;
    }
    async hash(value) {
        const hash = await bcrypt_1.default.hash(value, this.salt);
        return hash;
    }
    async compare(value, hash) {
        const isValid = await bcrypt_1.default.compare(value, hash);
        return isValid;
    }
}
exports.BcryptAdapter = BcryptAdapter;
