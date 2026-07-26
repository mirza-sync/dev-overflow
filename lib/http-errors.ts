export const Errors = {
  RequestError: "RequestError",
  ValidationError: "ValidationError",
  NotFoundError: "NotFoundError",
  ForbiddenError: "ForbiddenError",
  UnauthorizedError: "UnauthorizedError",
} as const;

export type ErrorName = (typeof Errors)[keyof typeof Errors];

export interface RequestError extends Error {
  readonly name: ErrorName;
  readonly statusCode: number;
  readonly errors?: Record<string, string[]>;
}

export const formatFieldErrors = (errors: Record<string, string[]>): string =>
  Object.entries(errors)
    .map(([field, messages]) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
      return messages[0] === "Required"
        ? `${fieldName} is required`
        : messages.join(" and ");
    })
    .join(", ");

export const RequestError = (
  statusCode: number,
  message: string,
  errors?: Record<string, string[]>,
  name: ErrorName = Errors.RequestError
): RequestError => {
  const error = new Error(message) as RequestError;
  return Object.freeze(
    Object.assign(error, {
      name,
      statusCode,
      errors,
    })
  );
};

export const ValidationError = (
  fieldErrors: Record<string, string[]>
): RequestError =>
  RequestError(
    400,
    formatFieldErrors(fieldErrors),
    fieldErrors,
    Errors.ValidationError
  );

export const NotFoundError = (resource: string): RequestError =>
  RequestError(404, `${resource} not found`, undefined, Errors.NotFoundError);

export const ForbiddenError = (message = "Forbidden"): RequestError =>
  RequestError(403, message, undefined, Errors.ForbiddenError);

export const UnauthorizedError = (message = "Unauthorized"): RequestError =>
  RequestError(401, message, undefined, Errors.UnauthorizedError);
