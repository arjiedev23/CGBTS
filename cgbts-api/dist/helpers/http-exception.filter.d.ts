import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private httpAdapterHost;
    private readonly logger;
    constructor(httpAdapterHost: HttpAdapterHost);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
