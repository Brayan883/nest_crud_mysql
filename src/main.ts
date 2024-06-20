import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = ["http://localhost:3000", "http://localhost:3001"];

  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      if (!whitelist.includes(origin) || !origin) {
        callback(new Error("Not allowed by CORS"));
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
