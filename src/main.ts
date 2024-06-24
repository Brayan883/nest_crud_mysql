import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ImATeapotException, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = [process.env.CORS_URL];

  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      if (!whitelist.includes(origin) && origin) {
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

  await app.listen(3000);
}
bootstrap();
