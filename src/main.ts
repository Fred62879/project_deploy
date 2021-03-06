import { Logger } from '@nestjs/common';

require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { initializeMongo } from './mongoModels';
import { Secrets } from './secrets';
import { initializeStorageDirectories } from './storage/initializeStorageDirectories';

import * as express from 'express';
import { join } from 'path';
import { GlobalRedirectForReact } from './GlobalRedirectForReact';


async function bootstrap() {
  // Connect to MongoDB and set up Models.
  await initializeMongo(Secrets.MongoConnectionString);

  initializeStorageDirectories();

  const app = await NestFactory.create(AppModule);


  console.log("MAIN::");
  // console.log(join(__dirname, '../build'));
  app.useGlobalFilters(new GlobalRedirectForReact());
  // app.use(express.static(join(__dirname, '../build')));

  // CORS -- change origin when deploying
  app.enableCors(
    { origin: 'http://localhost:3000' }
  )
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Coder Community')
    .setDescription('The Coder Community API description')
    .setVersion('0.0.2')
    .addServer('http://localhost:3001')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
