import { createParamDecorator, ExecutionContext, InternalServerErrorException, Logger } from "@nestjs/common";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if(!request.user) {
      Logger.error('User not found in request', 'UserDecorator');
      throw new InternalServerErrorException('User not found in request');
    }
    return request.user;
  }
);