import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger(HttpLoggerMiddleware.name);

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';

    this.logger.log(
      `${method} ${url} ${userAgent} ${ip} - request received:`,
      request.body,
    );

    const originalResponseSend = response.send;
    let responseBody;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    response.send = function (body) {
      responseBody = body;
      originalResponseSend.call(response, body);
    };

    response.on('finish', () => {
      const { statusCode } = response;
      this.logger.log(
        `${method} ${url} ${userAgent} ${ip} ${statusCode} - response sent:`,
        responseBody ? JSON.parse(responseBody) : responseBody,
      );
    });

    next();
  }
}
