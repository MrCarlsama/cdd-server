import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

export const configModule = (path: string, options?: ConfigModuleOptions) =>
  ConfigModule.forRoot({
    envFilePath: ['./app.env'],
    ...options,
  });
