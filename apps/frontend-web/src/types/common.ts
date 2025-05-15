export interface ApiError {
  statusCode: boolean;
  error: string;
  message: string;
  errors?: {
    property: string;
    messages: string[];
  }[];
}
