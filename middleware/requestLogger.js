import logger from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  const writableMethods = ["POST", "PUT", "PATCH", "DELETE"];

  if (writableMethods.includes(req.method)) {
    logger.info("Write Operation", {
      path: req.path,
      method: req.method,
      query: req.query,
      ip: req.ip,
    });
  } else {
    logger.debug("Read Operation", {
      path: req.path,
      method: req.method,
      ip: req.ip,
    });
  }
  next();
};
