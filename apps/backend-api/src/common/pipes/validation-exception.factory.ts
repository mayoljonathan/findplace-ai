import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const result = errors.map((error) => ({
    property: error.property,
    messages: Object.values(error.constraints),
  }));

  return new BadRequestException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Validation failed',
    error: result,
  });
};
