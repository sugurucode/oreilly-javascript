import { HTTP_STATUS } from './statusCode.ts';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = `カスタムエラー`;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// 使用例
try {
  throw new CustomError('認証失敗', HTTP_STATUS.UNAUTHORIZED);
} catch (e) {
  if (e instanceof Error) {
    console.error(e.name);
    console.error(e.message);
  } else {
    console.error(e);
  }
}
