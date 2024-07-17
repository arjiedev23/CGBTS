import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(
      `Exception: ${exception.message}, stack: ${exception.stack}`,
    );

    const responseBody = {
      respCode: 0,
      respMessage: 'Something went wrong!',
    };

    let errorCode: number;
    if (exception instanceof HttpException) {
      errorCode = exception.getStatus();
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
    } else {
      errorCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody.respCode = errorCode;
      responseBody.respMessage = 'Error occured while processing your request!';
    }

    response.status(status).json(responseBody);
  }
}
