import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(newUser: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.username = newUser.username;
    user.password = newUser.password;
    return this.usersRepository.save(user);
  }
}
