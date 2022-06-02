/// <reference types="node" />
/// <reference types="node" />
import { ConnectConfig } from 'ssh2';
import { WriteStreamOptions } from 'ssh2-sftp-client';
import SftpClient = require('ssh2-sftp-client');
export declare class SftpClientService {
    private readonly sftpClient;
    private readonly logger;
    constructor(sftpClient: SftpClient);
    client(): SftpClient;
    resetConnection(config: ConnectConfig): Promise<void>;
    disconnect(): Promise<void>;
    stat(remotePath: string): Promise<SftpClient.FileStats>;
    realPath(remotePath: string): Promise<string>;
    upload(contents: string | Buffer | NodeJS.ReadableStream, remoteFilePath: string, options?: WriteStreamOptions): Promise<string>;
    list(remoteDirectory: string, pattern?: string | RegExp): Promise<SftpClient.FileInfo[]>;
    download(path: string, dst?: string | NodeJS.WritableStream, options?: WriteStreamOptions): Promise<string | NodeJS.WritableStream | Buffer>;
    delete(remoteFilePath: string): Promise<void>;
    makeDirectory(remoteFilePath: string, recursive?: boolean): Promise<void>;
    removeDirectory(remoteFilePath: string, recursive?: boolean): Promise<void>;
    rename(remoteSourcePath: string, remoteDestinationPath: string): Promise<void>;
    exists(remotePath: string): Promise<false | 'd' | '-' | 'l'>;
    connect(config: ConnectConfig): Promise<void>;
}
