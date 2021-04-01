import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MyLogger } from './lib/logger';

const line = '-'.repeat(50);

/**
 * 报错过滤器
 */
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  constructor(private readonly logger: MyLogger) {}

  catch(exception: T, host: ArgumentsHost) {
    const { logger } = this;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let errorLog = exception;
    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';

    // 请求错误
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      code = exception.getStatus();
      error = exception.message;

      if (code === 401) {
        error = '权限不足或过期';
      }
    } else {
      logger.error(errorLog, '服务运行错误');
    }

    const resJson = { code, error, isSuccess: false };

    // 错误日志
    logger.error(resJson, '响应错误');
    logger.log(line, '请求结束');

    response.status(code).json(resJson);
  }
}

/*
Bad Request Exception 错误的请求异常
Unauthorized Exception 未经授权的例外
Not Found Exception 找不到异常
Forbidden Exception 禁止例外
Not Acceptable Exception 不可接受的例外
Request Timeout Exception 请求超时异常
Conflict Exception 冲突例外
Gone Exception 异常消失
Pay load Too Large Exception 有效负载过大
Unsupported Media Type Exception 不支持的媒体类型异常
Unprocessab le Exception 无法处理的异常
Internal Server Error Exception 内部服务器错误异常
Not Imp lemented Exception 未实施异常
Bad Gateway Exception 错误的网关异常
Service Unavailab le Exception 服务不可用异常
Gateway Timeout Exception 网关超时异常
*/
