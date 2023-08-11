import { Response } from 'express';

export class BaseController {
  public ok(res: Response, message?: any) {
    return res.status(200).json(message ? message : 'ok');
  }

  public created(res: Response, message?: any) {
    return res.status(201).json(message ? message : 'ok');
  }

  public conflict(res: Response, message?: string, err?: Error) {
    return res.status(409).json({
      name: err?.name || 'Conflict',
      message: message ? message : 'Conflict',
    });
  }

  public internalError(res: Response, err?: Error | string) {
    console.log(err);
    return res.status(500).json({
      name: 'InternalServerError',
      message: err ? err.toString() : 'Internal Server Error',
    });
  }

  public badRequest(res: Response, message?: string, error?: Error) {
    return res.status(400).json({
      name: error?.name || 'BadRequest',
      message: message ? message : 'Bad Request',
    });
  }

  public notFound(res: Response, message?: string, error?: Error) {
    return res.status(404).json({
      name: error?.name || 'NotFound',
      message: message ? message : 'Not Found',
    });
  }

  public unAuthorized(res: Response, message?: string) {
    return res
      .status(401)
      .json({ message: message ? message : 'Not Authorized' });
  }
}
