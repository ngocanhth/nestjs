import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const port = +process.env.APP_PORT || 5000;
  app.setGlobalPrefix('api/v1')
  console.log('Port running on: ', port)


  logger.log(`Application listening on port ${port}`);

  const options = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Todo APP')
  .setDescription('Todo API documentation')
  .setVersion('1.0')
  .addTag('Todo')
  .build()
  
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/v1', app, document)

  await app.listen(port);
}

bootstrap();