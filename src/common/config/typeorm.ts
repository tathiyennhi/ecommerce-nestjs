import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: ".env" });
console.log(__dirname + "/src/migrations/*{.ts,.js}");
const config = {
  type: "postgres",
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_DATABASE}`,
  entities: ["dist/src/modules/**/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
