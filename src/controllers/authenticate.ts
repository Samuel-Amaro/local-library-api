import Elysia from "elysia";

export class UnauthorizedError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export const authenticate = new Elysia()
  .error({ UNAUTHORIZED: UnauthorizedError })
  .onError(({ code, error }) => {
    if (code === "UNAUTHORIZED") {
      return new Response(error.message, {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Restricted Area"',
        },
      });
    }
  })
  .derive(({ headers }) => {
    const authHeader = headers["authorization"];

    if (!authHeader) {
      return { basicAuth: { isAuthed: false } };
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii",
    );
    const [username, password] = credentials.split(":");

    if (
      username === import.meta.env.AUTHENTICATION_USERNAME &&
      password === import.meta.env.AUTHENTICATION_PASSWORD
    ) {
      return { basicAuth: { isAuthed: true } };
    }

    return { basicAuth: { isAuthed: false } };
  })
  .onTransform(({ basicAuth, path, request }) => {
    if (
      !basicAuth.isAuthed &&
      path !== undefined &&
      request.method !== "OPTIONS"
    ) {
      throw new UnauthorizedError(
        "Unauthorized, authentication required with format username:password",
      );
    }
  })
  .propagate();
