import { Module } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journal } from './entities/journal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journal]), AuthModule],
  controllers: [JournalController],
  providers: [JournalService],
})
export class JournalModule {}
