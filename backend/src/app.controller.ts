import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
const processId = process.pid;

@Controller()
export class AppController {
  @Get()
  create(@Req() req: Request, @Res() res: Response): void {
    for (let index = 0; index < 1e7; index++);
    res.end(`handled by pid: ${processId}`);
  }
}
