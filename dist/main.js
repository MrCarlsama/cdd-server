"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./http-exception.filter");
const logger_1 = require("./lib/logger");
const transform_interceptor_1 = require("./transform.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const logger = new logger_1.MyLogger(process.env.LOG_PATH);
    app.useLogger(logger);
    app.setGlobalPrefix('/api');
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(logger));
    const documentBuilder = new swagger_1.DocumentBuilder()
        .setTitle('CDD-Server')
        .setDescription('cdd')
        .addBearerAuth()
        .addServer('/api')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, documentBuilder, {
        ignoreGlobalPrefix: true,
    });
    swagger_1.SwaggerModule.setup('/api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map