import { Controller, Post, Req, Res } from "@nestjs/common";
import { Request } from "express";
import { LoginUserUseCase } from "./loginUserUseCase";

@Controller('user')
export class LoginUserController {
  constructor() {}

  @Post('/login')
  async executeImpl(
    @Req() request: Request,
  ): Promise<any> {
    const {name, password} = request.body as any;
    const user = await new LoginUserUseCase().execute(name, password);
    console.log('SESSION LOGIN', request.sessionID);
    (request.session as any).user = {name, password};
    console.log(request.session);
    return request.session;
  }
}