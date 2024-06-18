export class Result {
  status: string;
  data: any;
  message: any;
  constructor(status: string, data: any, message: any) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
