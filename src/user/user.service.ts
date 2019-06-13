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
  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  // Find a user given its email
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Create and return User Instance, user is not saved in th DB yet
  async create(data: CreateUserDto): Promise<User> {
    return await this.userRepository.create({
      ...data,
    });
  }

  // Save a User in the Database
  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
