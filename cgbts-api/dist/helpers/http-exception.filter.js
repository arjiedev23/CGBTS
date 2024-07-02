"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        this.logger.error(`Exception: ${exception.message}, stack: ${exception.stack}`);
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
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map