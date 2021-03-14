import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MyLogger } from './lib/logger';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 处理跨域
  app.enableCors();

  // 日志
  const logger = new MyLogger(process.env.LOG_PATH);
  app.useLogger(logger);

  // 接口请求前缀
  app.setGlobalPrefix('/api');

  // 验证管道

  // 响应参数统一格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 异常处理

  // swagger 接口文档
  const documentBuilder = new DocumentBuilder()
    .setTitle('CDD-Server')
    .setDescription('cdd')
    .addBearerAuth()
    .addServer('/api')
    .build();
  const document = SwaggerModule.createDocument(app, documentBuilder, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
}
bootstrap();
