import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    this.logger.error(
      `Exception: ${exception.message}, stack: ${exception.stack}`,
    );

    const responseBody = {
      respCode: 0,
      respMessage: 'Something went wrong!',
    };

    switch (exception.getStatus()) {
      case 401: {
        responseBody.respCode = exception.getStatus();
        responseBody.respMessage = 'Access denied!';
        break;
      }
      case 500: {
        responseBody.respCode = exception.getStatus();
        responseBody.respMessage =
          'Error occured while processing your request!';
        break;
      }
      case 404: {
        responseBody.respCode = exception.getStatus();
        responseBody.respMessage = '404 - NOT FOUND';
        break;
      }
      default: {
        responseBody.respCode = exception.getStatus();
        responseBody.respMessage = 'Something went wrong!';
        break;
      }
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, exception.getStatus());
  }
}
