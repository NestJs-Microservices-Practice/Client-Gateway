import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';

import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    if ( rpcError?.toString().includes('Empty response') ) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1)
      })
    }

    // Logger.error(rpcError, 'RpcCustomExceptionFilter-Gateway');
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 :+rpcError.status;
      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}