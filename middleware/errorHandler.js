export const errorHandler = (err, req, res, next) => {
  console.error(`Message: ${err.message}`);
  console.error(`Stack: ${err.stack}`);

  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong, please try again later."
      : err.message;

  const response = { status: "error", message: message };
  if (err.errors) {
    response.errors = err.errors;
  }

  return res.status(status).json(response);
};
