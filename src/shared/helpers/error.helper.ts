import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../interfaces/base.interface';

export const ErrorMessage = (
  errors:
    | {
        [key: string]: string | string[] | number | Record<string, unknown>;
      }
    | string
): string => {
  if (typeof errors === 'object') {
    return Object.keys(errors)
      .map(key => {
        if (errors[key] && Array.isArray(errors[key])) {
          return errors[key];
        }

        if (typeof errors[key] === 'object') {
          return Object.keys(errors[key])
            .map(key =>
              ErrorMessage(
                errors[key] as {
                  [key: string]:
                    | string
                    | string[]
                    | number
                    | Record<string, unknown>;
                }
              )
            )
            .join(', ');
        }
        return errors[key];
      })
      .join(', ');
  }

  return errors;
};

const sanitizedAxiosError = (
  error: AxiosError,
  serverError: AxiosError<ErrorResponse>
) => {
  if (serverError?.response) {
    return {
      ...serverError?.response?.data,
      message: ErrorMessage(
        serverError?.response?.data?.errors ??
          ([
            serverError?.response?.data?.message ??
              serverError?.response?.statusText ??
              error.message,
          ] as any)
      ),
      error:
        serverError?.response?.data?.message ??
        serverError?.response?.statusText ??
        error.message,
      code: serverError?.code || 'FAILED',
      statusCode: serverError?.response?.status || 400,
      success: false,
      mnoCheckout: undefined,
      data: undefined,
      bankCheckout: undefined,
    };
  }
  return {
    ...error,
    success: false,
    message:
      serverError?.message ?? error.response?.statusText ?? error?.message,
    error: error.response?.statusText ?? error?.message,
    statusCode: error.response?.status ?? 400,
    code: serverError?.code || 'FAILED',
    mnoCheckout: Function,
    data: null,
    bankCheckout: null,
  };
};
export const sanitizeErrorResponse = (error: AxiosError): ErrorResponse => {
  const serverError = error as AxiosError<ErrorResponse>;
  if (axios.isAxiosError(error)) {
    return sanitizedAxiosError(error, serverError) as ErrorResponse;
  }
  return {
    success: false,
    message:
      serverError?.response?.statusText ??
      serverError?.message ??
      'Internal server error',
    error:
      serverError?.response?.statusText ??
      serverError?.message ??
      'Internal server error',
    statusCode: 400,
    code: 'FAILED',
    mnoCheckout: undefined,
    data: undefined,
    bankCheckout: undefined,
  };
};
