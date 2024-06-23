import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import * as winston from "winston";

dotenvConfig({ path: ".env" });

const config = {
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
      // filename: `logs/app-${new Date().toISOString().split('T')[0]}.log`, // Đường dẫn tới file log
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
};

export default registerAs("winston", () => config);
