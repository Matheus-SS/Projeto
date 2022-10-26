import { Response } from 'express';

export class BaseController {
  public ok(res: Response, message?: any) {
    return res.status(200).json(message ? message : 'ok');
  }

  public conflict(res: Response, message?: string) {
    return res.status(409).json({ message: message ? message : 'Conflict' });
  }

  public internalError(res: Response, err: Error | string) {
    console.log(err);
    return res
      .status(500)
      .json({ message: err ? err.toString() : 'Internal Server Error' });
  }

  public badRequest(res: Response, message?: string) {
    return res.status(400).json({ message: message ? message : 'Bad Request' });
  }
}
