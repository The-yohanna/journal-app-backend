import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { JournalModule } from './journal/journal.module';
import { Journal } from './journal/entities/journal.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'journal',
      entities: [User, Journal],
      logging: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    JournalModule,
  ],
})
export class AppModule {}
