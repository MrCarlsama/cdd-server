import { Logger } from '@nestjs/common';
import * as log4js from 'log4js';
export declare class MyLogger extends Logger {
    log4js: log4js.Logger;
    constructor(filename: string);
    log(message: any, trace: string): void;
    error(message: any, trace: string): void;
    warn(message: any, trace: string): void;
    debug(message: any, trace: string): void;
    verbose(message: any, trace: string): void;
}
