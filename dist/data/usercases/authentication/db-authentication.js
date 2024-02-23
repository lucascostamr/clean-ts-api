"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbAuthentication = void 0;
class DbAuthentication {
    loadAccountByEmailRepository;
    hashComparer;
    encrypter;
    updateAccessTokenRepository;
    constructor(loadAccountByEmailRepository, hashComparer, encrypter, updateAccessTokenRepository) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
        this.updateAccessTokenRepository = updateAccessTokenRepository;
    }
    async auth(authentication) {
        const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password);
            if (!isValid)
                return null;
            const accessToken = await this.encrypter.encrypt(account.id);
            await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken);
            return accessToken;
        }
        return null;
    }
    ;
}
exports.DbAuthentication = DbAuthentication;
