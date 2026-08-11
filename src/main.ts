import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import { AppModule } from './app.module';

async function bootstrap() {
const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter(),
  {
    logger: ['error', 'warn'],
  },
);

  await app.register(fastifyCors, {
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.register(fastifyCookie);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api');

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('NivaasaHub Admin Backend API')
    .setDescription('API Documentation for NivaasaHub Admin Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Changed Swagger URL
  SwaggerModule.setup('api/admin-docs', app, document);

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger running on http://localhost:${port}/api/admin-docs`);
}

bootstrap();