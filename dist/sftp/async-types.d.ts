import { DynamicModule, FactoryProvider, ValueProvider } from '@nestjs/common';
export interface ImportableFactoryProvider<T> extends Omit<FactoryProvider<T>, 'provide'>, Pick<DynamicModule, 'imports'> {
}
export declare type AsyncProvider<T> = ImportableFactoryProvider<T> | Omit<ValueProvider<T>, 'provide'>;
