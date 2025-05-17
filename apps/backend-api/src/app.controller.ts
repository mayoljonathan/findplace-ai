import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  private lastPing: Date;

  @Get()
  check() {
    const lastPing = this.lastPing;
    this.lastPing = new Date();

    return {
      message: 'App is running',
      lastPing,
      now: new Date(),
    };
  }
}
