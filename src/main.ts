import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as winston from "winston";
import { WinstonModule } from "nest-winston";
import { AllExceptionsFilter } from "./common/exception-filters/all-exceptions";
import { ResponseInterceptor } from "./common/interceptors/response";
import { DataSource } from "typeorm";

async function createDatabaseIfNotExists(dataSource: DataSource, dbName: string) {
  try {
    console.log('Start create DB');
    // const dbName = 'test-db-10';
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  const databases = await queryRunner.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${dbName}');`,
  );

  if (databases.length === 0) {
    await queryRunner.query(`CREATE DATABASE "${dbName}";`);
    console.log(`Database ${dbName} created.`);
  } else {
    console.log(`Database ${dbName} already exists.`);
  }

  await queryRunner.release();
  } catch (error) {
    console.log(error?.message);
  }
  
}

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

  // create DB for dev/prod
  const dataSource = app.get(DataSource);
  const dbName = process.env.DB_DATABASE;
  console.log('dbName = ', dbName);
  await createDatabaseIfNotExists(dataSource, dbName);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseInterceptor());

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
  console.log("App is running at localhost:3000");
}
bootstrap();
