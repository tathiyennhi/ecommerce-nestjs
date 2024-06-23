export class GenericException extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly error?: any,
  ) {
    super(message); // Gọi hàm tạo của lớp Error với message
    this.name = this.constructor.name; // Đặt tên lớp ngoại lệ bằng tên lớp hiện tại
    this.statusCode = statusCode; // Gán statusCode
    this.error = error; // Gán error, nếu có
  }
}
