export interface ApiError {
  statusCode: number;
  error: string;
  message: string;
  errors?: {
    property: string;
    messages: string[];
  }[];
}
