interface EnvironmentVariable {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_API_KEY: string;
}

declare namespace NodeJS {
  type ProcessEnv = EnvironmentVariable;
}
