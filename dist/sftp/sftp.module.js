"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SftpModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const sftp_client_service_1 = require("./sftp-client/sftp-client.service");
const SftpClient = require("ssh2-sftp-client");
let SftpModule = SftpModule_1 = class SftpModule {
    static forRoot(config, delayConnection = false) {
        return {
            module: SftpModule_1,
            providers: [
                sftp_client_service_1.SftpClientService,
                {
                    provide: SftpClient,
                    useFactory: async () => {
                        const client = new SftpClient();
                        if (!delayConnection) {
                            await client.connect(config);
                        }
                        return client;
                    },
                },
            ],
            exports: [sftp_client_service_1.SftpClientService],
        };
    }
    static forRootAsync(config, delayConnection = false) {
        const configToken = 'CONNECT_CONFIG';
        const module = {
            global: true,
            module: SftpModule_1,
            imports: [],
            providers: [
                sftp_client_service_1.SftpClientService,
                {
                    provide: SftpClient,
                    useFactory: async (connectConfig) => {
                        const client = new SftpClient();
                        if (!delayConnection) {
                            await client.connect(connectConfig);
                        }
                        return client;
                    },
                    inject: [configToken],
                },
            ],
            exports: [sftp_client_service_1.SftpClientService],
        };
        this.addAsyncProvider(module, configToken, config, false);
        return module;
    }
    static addAsyncProvider(module, provide, asyncProvider, exportable) {
        const imports = asyncProvider.imports;
        if (imports === null || imports === void 0 ? void 0 : imports.length) {
            imports.forEach((i) => module.imports.push(i));
        }
        delete asyncProvider.imports;
        module.providers.push(Object.assign(Object.assign({}, asyncProvider), { provide }));
        if (exportable) {
            module.exports.push(provide);
        }
    }
};
SftpModule = SftpModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [sftp_client_service_1.SftpClientService],
        exports: [sftp_client_service_1.SftpClientService],
    })
], SftpModule);
exports.SftpModule = SftpModule;
//# sourceMappingURL=sftp.module.js.map