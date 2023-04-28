import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const msg =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception.message;

    this.logger.error(
      `Http Status: ${status} Error Message: ${JSON.stringify(msg)}`,
    );

    response.status(status).json({
      statusCode: status,
      message: msg,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
