"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLogger = void 0;
const common_1 = require("@nestjs/common");
const log4js = require("log4js");
class MyLogger extends common_1.Logger {
    constructor(filename) {
        super();
        log4js.configure({
            appenders: {
                all: {
                    filename: `${filename}/all.log`,
                    type: 'dateFile',
                    layout: { type: 'pattern', pattern: '%d [%p] %m' },
                    pattern: 'yyyy-MM-dd',
                    keepFileExt: true,
                    alwaysIncludePattern: true,
                    daysToKeep: 10,
                },
            },
            categories: { default: { appenders: ['all'], level: 'all' } },
        });
        this.log4js = log4js.getLogger();
    }
    log(message, trace) {
        super.log(message, trace);
        this.log4js.info(trace, message);
    }
    error(message, trace) {
        super.error(message, trace);
        this.log4js.error(trace, message);
    }
    warn(message, trace) {
        super.warn(message, trace);
        this.log4js.warn(trace, message);
    }
    debug(message, trace) {
        super.debug(message, trace);
        this.log4js.debug(trace, message);
    }
    verbose(message, trace) {
        super.verbose(message, trace);
        this.log4js.info(trace, message);
    }
}
exports.MyLogger = MyLogger;
//# sourceMappingURL=index.js.map