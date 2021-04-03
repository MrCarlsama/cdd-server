import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { MyLogger } from './lib/logger';
export declare class HttpExceptionFilter<T> implements ExceptionFilter {
    private readonly logger;
    constructor(logger: MyLogger);
    catch(exception: T, host: ArgumentsHost): void;
}
