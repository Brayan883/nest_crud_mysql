import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ImATeapotException, ValidationPipe } from "@nestjs/common";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = [process.env.CORS_URL];

  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      if (!whitelist.includes(origin)) {
        return callback(new ImATeapotException("Not allowed by CORS"), false);
      } else {
        callback(null, true);
      }
    },
  });

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("api example")
    .setDescription("API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
