export interface RequestError extends Error {
  readonly name: ErrorNameType;
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

export const createRequestError = (
  statusCode: number,
  message: string,
  errors?: Record<string, string[]>,
  name: ErrorNameType = ErrorName.RequestError
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

export const createValidationError = (
  fieldErrors: Record<string, string[]>
): RequestError =>
  createRequestError(
    400,
    formatFieldErrors(fieldErrors),
    fieldErrors,
    ErrorName.ValidationError
  );

export const createNotFoundError = (resource: string): RequestError =>
  createRequestError(
    404,
    `${resource} not found`,
    undefined,
    ErrorName.NotFoundError
  );

export const createForbiddenError = (message = "Forbidden"): RequestError =>
  createRequestError(403, message, undefined, ErrorName.ForbiddenError);

export const createUnauthorizedError = (
  message = "Unauthorized"
): RequestError =>
  createRequestError(401, message, undefined, ErrorName.UnauthorizedError);

export const ErrorName = {
  RequestError: "RequestError",
  ValidationError: "ValidationError",
  NotFoundError: "NotFoundError",
  ForbiddenError: "ForbiddenError",
  UnauthorizedError: "UnauthorizedError",
} as const;

export type ErrorNameType = (typeof ErrorName)[keyof typeof ErrorName];
