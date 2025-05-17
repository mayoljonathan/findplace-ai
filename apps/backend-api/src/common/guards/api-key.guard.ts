import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService<EnvironmentVariable>) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'] as string;

    console.log('apiKey', apiKey);

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const validApiKeys = this.configService.get('API_KEYS')?.split(',') || [];

    if (!validApiKeys.includes(apiKey)) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
