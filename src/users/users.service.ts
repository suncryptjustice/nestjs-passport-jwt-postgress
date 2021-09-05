import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findWithEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email: email });
  }

  async remove(id: number): Promise<any> {
    const res = await this.usersRepository.delete(id);
    if (res.affected > 0) {
      return { message: 'Success' };
    } else {
      throw new HttpException(
        `User with id: ${id}, doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
