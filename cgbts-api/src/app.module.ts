import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ContributionsModule } from './contributions/contributions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, ContributionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
