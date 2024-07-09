import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const builder = new DocumentBuilder()
    .setTitle('Journal API')
    .setDescription('The journal API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, builder);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
