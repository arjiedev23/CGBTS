"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("../helpers/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const httpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(httpAdapterHost));
<<<<<<< HEAD
    await app.listen(1434);
=======
    await app.listen(process.env.PORT);
>>>>>>> benefits-module
}
bootstrap();
//# sourceMappingURL=main.js.map