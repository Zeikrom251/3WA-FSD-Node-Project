import rateLimit from "express-rate-limit"

const applyRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "To many request from this IP, please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
})

export default applyRateLimit
