// Importamos el decorador 'Module' desde el paquete '@nestjs/common'
import { Module } from '@nestjs/common';

// Importamos los controladores y proveedores de la aplicación
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importamos el módulo 'ConfigModule' desde el paquete '@nestjs/config'
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

// Definimos el módulo 'AppModule' utilizando el decorador 'Module'
@Module({
  // Importamos el módulo 'ConfigModule' para cargar las variables de entorno
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'], // Archivo de variables de entorno a cargar
      isGlobal: true, // Variables de entorno disponibles en toda la aplicación
    }),
    UserModule,
  ],

  // Agregamos los controladores y proveedores a este módulo
  controllers: [AppController],
  providers: [AppService],
})

// Exportamos el módulo 'AppModule' para ser utilizado en la aplicación
export class AppModule {}
