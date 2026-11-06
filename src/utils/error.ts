// One error type for the client's fetches: the fetch wrappers throw it, and
// the router's ErrorFallback renders it through ErrorView.
export class AppError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  static async fromResponse(response: Response) {
    // A static host's error body is an HTML page, not a message to show.
    return new AppError(
      response.statusText || "Request failed",
      response.status,
    );
  }
}

export const EntryNotFoundError = new AppError("Entry not found", 404);
