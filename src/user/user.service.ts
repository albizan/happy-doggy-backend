import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Find a user given its ID
  async findById(id: string) {
    return await this.userRepository.findOne(id);
  }

  // Find a user given its email
  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  // Create User Instance and return it, user is not saved in th DB yet
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create({
      ...createUserDto,
    });
  }

  // Save a User in the Database
  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
