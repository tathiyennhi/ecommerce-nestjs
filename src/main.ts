import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as winston from "winston";
import { WinstonModule } from "nest-winston";
import { AllExceptionsFilter } from "./common/exception-filters/all-exceptions";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      // options (same as WinstonModule.forRoot() options)
      transports: [
        // Ghi log ra console
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        // Ghi log vào file
        new winston.transports.File({
          filename: "logs/app.log", // Đường dẫn tới file log
          level: "info", // Chỉ ghi các log từ mức độ này trở lên
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(), // Ghi log dưới định dạng JSON
          ),
        }),
        // Ghi log lỗi vào một file riêng
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error", // Chỉ ghi các log lỗi
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
  });
  app.useGlobalPipes(new ValidationPipe());

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
  console.log("App is running at localhost:3000");
}
bootstrap();
