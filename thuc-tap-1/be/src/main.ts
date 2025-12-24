import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/share/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './share/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Thêm ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ properties không khai báo
      forbidNonWhitelisted: true, // Báo lỗi nếu có properties không khai báo
      transform: true, // Tự động transform types
    }),
  );
  // Enable CORS
  app.enableCors();

  // Use global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('MiniShop API')
    .setDescription('API documentation for MiniShop application')
    .setVersion('1.0')
    .addTag('Quản lý người dùng')
    .addTag('Admin')
    .addTag('Common')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 4333;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
