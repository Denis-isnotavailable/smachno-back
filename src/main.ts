import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeName } from 'swagger-themes';
import { AppModule } from './app.module';

async function bootstrap() {
 const app = await NestFactory.create(AppModule);
 const config = new DocumentBuilder()
  .setTitle('СМАЧНО НА СЕЛІ API')
  .setDescription('Ця документація описує API для Смачно на селі проекту на NestJS та TypeORM ')
  .setVersion('0.9')
  .build();
 app.enableCors();
 const document = SwaggerModule.createDocument(app, config);
 const theme = new SwaggerTheme();
 const options = {
  explorer: true,
  customCss: theme.getBuffer(<SwaggerThemeName>'dark-monokai'),
 };

 SwaggerModule.setup('api', app, document, options);

 app.useGlobalPipes(new ValidationPipe({ transform: true }));

 const PORT = process.env.PORT || 3000;
 await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
