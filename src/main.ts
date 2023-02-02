import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 5000;
  app.setGlobalPrefix('api/v1')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  )
  app.use(cookieParser())

  console.log('Port running on: ', port)

  logger.log(`Application listening on port ${port}`);

  const options = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('E-Learning App')
  .setDescription('Learning Management System ')
  .setVersion('1.0')
  .addTag('E learning')
  .build()
  
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/v1', app, document)

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  await app.listen(port);
}

bootstrap();