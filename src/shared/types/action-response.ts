import { ErrorCode } from '@/shared/constants/error-codes';

export type ActionError = {
  code: ErrorCode;
  message?: string;
};

export type ActionResponse<T = void> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: ActionError };
