import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  readonly openai: OpenAI;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariable>,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async createChatCompletion<T = any>({
    userPrompt,
    systemPrompt,
  }: {
    userPrompt: string;
    systemPrompt: string;
  }) {
    const response = await this.openai.chat.completions.create({
      model: this.configService.get('OPENAI_MODEL'),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    return JSON.parse(response.choices[0].message.content) as T;
  }
}
