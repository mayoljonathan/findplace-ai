interface EnvironmentVariable {
  // Application
  PORT: string;
  NODE_ENV: 'development' | 'production';
  API_KEYS: string;

  // OpenAI
  OPENAI_API_KEY: string;
  OPENAI_MODEL: string;

  // Foursquare
  FOURSQUARE_API_URL: string;
  FOURSQUARE_API_KEY: string;
}

declare namespace NodeJS {
  type ProcessEnv = EnvironmentVariable;
}
