import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const payload = await this.validate(request);
    if (!payload) {
      return false;
    }
    // Append payload to request object
    request.jwt = payload;
    return true;
  }

  async validate(request): Promise<string> {
    const auth = request.headers.authorization;
    if (!auth) {
      return;
    }
    // Check if authorization header is not a Bearer token
    if (auth.split(' ')[0] !== 'Bearer') {
      return;
    }

    // Get encrypted token
    const encrypted = auth.split(' ')[1];

    try {
      return await jwt.verify(encrypted, process.env.SECRET);
    } catch {
      return;
    }
  }
}
