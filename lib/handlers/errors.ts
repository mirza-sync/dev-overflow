import { NextResponse } from "next/server";
import z, { ZodError } from "zod";
import { RequestError, ValidationError } from "../http-errors";
import logger from "../logger";

export type ResponseType = "api" | "server";

const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const isRequestError = (error: unknown): error is RequestError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "name" in error
  );
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  if (isRequestError(error)) {
    logger.error(
      { err: error },
      `${responseType.toUpperCase()} Errorr: ${error.message}`
    );

    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  if (error instanceof ZodError) {
    const validationError = ValidationError(z.treeifyError(error));

    logger.error(
      { err: error },
      `Validation Error: ${validationError.message}`
    );

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    logger.error(error.message);
    return formatResponse(responseType, 500, error.message);
  }

  logger.error({ error: error }, "An unexpected error occured");
  return formatResponse(responseType, 500, "An unexpected error occured");
};

export default handleError;
