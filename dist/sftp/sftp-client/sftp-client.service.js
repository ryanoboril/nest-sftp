"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SftpClientService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const SftpClient = require("ssh2-sftp-client");
let SftpClientService = SftpClientService_1 = class SftpClientService {
    constructor(sftpClient) {
        this.sftpClient = sftpClient;
        this.logger = new common_1.Logger(SftpClientService_1.name);
    }
    client() {
        return this.sftpClient;
    }
    async resetConnection(config) {
        try {
            await this.sftpClient.end();
            await this.sftpClient.connect(config);
        }
        catch (ex) {
            if (ex.code === 'ERR_NOT_CONNECTED') {
                await this.sftpClient.connect(config);
            }
            else {
                throw ex;
            }
        }
    }
    async disconnect() {
        await this.sftpClient.end();
    }
    async stat(remotePath) {
        return await this.sftpClient.stat(remotePath);
    }
    async realPath(remotePath) {
        return await this.sftpClient.realPath(remotePath);
    }
    async upload(contents, remoteFilePath, options = null) {
        return await this.sftpClient.put(contents, remoteFilePath, options);
    }
    async list(remoteDirectory, pattern) {
        return await this.sftpClient.list(remoteDirectory);
    }
    async download(path, dst, options) {
        return await this.sftpClient.get(path, dst, options);
    }
    async delete(remoteFilePath) {
        await this.sftpClient.delete(remoteFilePath);
    }
    async makeDirectory(remoteFilePath, recursive = true) {
        await this.sftpClient.mkdir(remoteFilePath, recursive);
    }
    async removeDirectory(remoteFilePath, recursive = true) {
        await this.sftpClient.rmdir(remoteFilePath, recursive);
    }
    async rename(remoteSourcePath, remoteDestinationPath) {
        await this.sftpClient.rename(remoteSourcePath, remoteDestinationPath);
    }
    async exists(remotePath) {
        return await this.sftpClient.exists(remotePath);
    }
    async connect(config) {
        await this.sftpClient.connect(config);
    }
};
SftpClientService = SftpClientService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [SftpClient])
], SftpClientService);
exports.SftpClientService = SftpClientService;
//# sourceMappingURL=sftp-client.service.js.map