import { rateLimit } from "express-rate-limit";

export const writeOperationsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: "error",
    error: "Too many write operations from this IP, please try again later",
  },
  skip: (req) => {
    return req.method === "GET";
  },
});
