import { JwtPayload, verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import jwt from "./index"

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload
}

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    res.status(401).json({
      message: "Authentification token required.",
    })
    return
  }

  if (!jwt.secret) {
    res.status(500).json({
      message: "JWT secret not configured.",
    })
    return
  }

  verify(token, jwt.secret, (err, user) => {
    if (err) {
      res.status(403).json({
        message: "Invalid or expired token.",
      })
      return
    }

    ;(req as AuthenticatedRequest).user = user
    next()
  })
}

export default authenticateToken
