import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Status } from "../enums/service-status-code.enum";
import { OptimisticLockVersionMismatchError } from "typeorm";

class ResponseBody {
  status: any;
  data: any;
  message: any;
  constructor(status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
  // statusCode: any;
  // timestamp: any;
  // path: any;
  // message: any;
  // constructor(statusCode, timestamp, path, message) {
  //   this.statusCode = statusCode;
  //   this.timestamp = timestamp;
  //   this.path = path;
  //   this.message = message;
  // }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = new ResponseBody(Status.ERROR, null, []);

    // Xử lý các loại exception khác nhau
    if (exception instanceof BadRequestException) {
      const response: any = exception.getResponse();
      // responseBody.message = "Input validation failed"; // response.message || ["Input validation failed"];
      responseBody.message = response.message || ["Input validation failed"];
    } else if (exception instanceof ForbiddenException) {
      responseBody.message = "Access denied";
    } else if (exception instanceof OptimisticLockVersionMismatchError) {
      responseBody.message =
        "The cart item was updated by another transaction. Please try again.";
    } else {
      // Xử lý các lỗi khác hoặc lỗi không xác định
      responseBody.message = exception?.message || "An error occurred";
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
