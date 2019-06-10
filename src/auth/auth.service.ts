import { Injectable, BadRequestException } from '@nestjs/common';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { JwtPayload } from './dtos/payload.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  // Function used to register users
  async register(data: RegisterUserDto): Promise<string> {
    const { name, email, password } = data;

    // Retreibe user with given email
    let user = await this.userService.findByEmail(email);

    // If a user is found, reject register request
    if (user) {
      throw new BadRequestException('User already exists');
    }

    // Hash the new user's password
    const hashedPassword: string = await this.hashPassword(password);

    // Create new User
    user = await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save the created user
    user = await this.userService.save(user);

    // Sign the payload and return encypted jwt
    return await this.sign({ id: user.id, email: email });
  }

  // Hash given password
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async sign(payload: JwtPayload): Promise<string> {
    const options = { expiresIn: '7d' };
    return await jwt.sign(payload, process.env.SECRET, options);
  }
}
