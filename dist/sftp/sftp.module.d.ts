import { AsyncProvider } from './async-types';
import { DynamicModule } from '@nestjs/common';
import { ConnectConfig } from 'ssh2';
export declare class SftpModule {
    static forRoot(config: ConnectConfig, delayConnection?: boolean): DynamicModule;
    static forRootAsync(config: AsyncProvider<ConnectConfig | Promise<ConnectConfig>>, delayConnection?: boolean): DynamicModule;
    private static addAsyncProvider;
}
