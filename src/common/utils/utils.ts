import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

export class Utils {
  static compareMD5Hash(password: string, hashedPassword: string): boolean {
    const md5Hash = crypto.createHash('md5').update(password).digest('hex');
    return md5Hash === hashedPassword;
  }
  static md5Hash(password: string): string {
    const md5Hash = crypto.createHash('md5').update(password).digest('hex');
    return md5Hash;
  }
}