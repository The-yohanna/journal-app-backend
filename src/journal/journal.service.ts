import { Injectable } from '@nestjs/common';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { Between, Repository } from 'typeorm';
import { Journal } from './entities/journal.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private journalsRepository: Repository<Journal>,
  ) {}
  create(createJournalDto: CreateJournalDto) {
    const journal = new Journal();
    journal.title = createJournalDto.title;
    journal.content = createJournalDto.content;
    journal.category = createJournalDto.category;
    journal.created_by = createJournalDto.created_by;
    return this.journalsRepository.save(journal);
  }

  findAll(user: string) {
    return this.journalsRepository.findBy({ created_by: user });
  }

  findOneById(id: number) {
    return this.journalsRepository.findOneBy({ id });
  }

  findByCategory(category: string, user: string) {
    return this.journalsRepository.findBy({ category, created_by: user });
  }

  update(id: number, updateJournalDto: UpdateJournalDto) {
    const journal = new Journal();
    journal.category = updateJournalDto.category;
    journal.content = updateJournalDto.content;
    journal.created_by = updateJournalDto.created_by;
    journal.title = updateJournalDto.title;
    journal.id = id;
    return this.journalsRepository.save(journal);
  }

  remove(id: number) {
    return this.journalsRepository.delete(id);
  }

  dateSummary(startDate: Date, endDate: Date, user: string) {
    return this.journalsRepository.findBy({
      created_at: Between(startDate, endDate),
      created_by: user,
    });
  }
}
