export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || "Internal server error.";

  return res.status(status).json({ status: "error", message: message });
};
