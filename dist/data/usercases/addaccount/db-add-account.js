"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAddAccount = void 0;
class DbAddAccount {
    hasher;
    accountRepository;
    constructor(hasher, accountRepository) {
        this.hasher = hasher;
        this.accountRepository = accountRepository;
    }
    async add(accountData) {
        const hashedPassword = await this.hasher.hash(accountData.password);
        const account = await this.accountRepository.add(Object.assign({}, accountData, { password: hashedPassword }));
        return account;
    }
}
exports.DbAddAccount = DbAddAccount;
