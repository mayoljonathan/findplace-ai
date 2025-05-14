interface EnvironmentVariable {
  NEXT_PUBLIC_API_URL: string;
}

declare namespace NodeJS {
  type ProcessEnv = EnvironmentVariable;
}
