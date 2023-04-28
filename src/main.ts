import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http.exception.filter';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
