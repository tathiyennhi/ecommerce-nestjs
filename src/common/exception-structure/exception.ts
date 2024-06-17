// import { Exception } from '@nestjs/common';

// Lớp Exception chung
export class GenericException {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly error?: any,
  ) {
    // super(message, statusCode);
  }
}