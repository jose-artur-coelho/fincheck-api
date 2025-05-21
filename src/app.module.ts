import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { validateEnv } from './config/validate.env';
import { AppConfigModule } from './config/app.config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    AuthModule,
    UsersModule,
    PrismaModule,
    AppConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
