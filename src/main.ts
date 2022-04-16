import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('LitRecenze API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Public')
    .addTag('Guarded')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
})();
