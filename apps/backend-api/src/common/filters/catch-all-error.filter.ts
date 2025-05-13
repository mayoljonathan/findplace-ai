import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class CatchAllErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(CatchAllErrorFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: object, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const isHttpException = exception instanceof HttpException;

    const httpStatus = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: isHttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR,
      error: isHttpException ? exception.name : 'ServerError',
      message: isHttpException ? exception.message : 'Internal server error',
      errors: isHttpException
        ? (exception.getResponse() as { errors?: any[] })?.errors
        : undefined,
    };

    if (typeof exception === 'object') {
      this.logger.error('stack' in exception ? exception.stack : exception);
    } else {
      // Possible unhandled promise rejection
      this.logger.error(exception);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
