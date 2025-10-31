import { compare } from "bcryptjs"
import { Request, Response, NextFunction } from "express"
import { sign } from "jsonwebtoken"
import { executeQuery } from "src/config/database/queries"

const AuthController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        res.status(400).json({ message: "Username and password are required" })
        return
      }

      const {
        success,
        data: [user],
        message,
      } = await executeQuery(
        `SELECT
            user.identifier AS id,
            user.email,
            user.password,
            user.role,
            user.create_at
        FROM user
        WHERE user.email = ?
        LIMIT 1`,
        [email]
      )

      if (success && user.length > 0) {
        const isPasswordValid = await compare(password, user?.password)

        if (!isPasswordValid) {
          res.status(401).json({ message: "Invalid credentials" })
          return
        }

        const token: string = sign(
          { id: user.id } as { id: string },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1h",
          }
        )

        const userData = {
          id: user.id,
          email: user.email,
          role: user.role,
          createdAt: user.create_at,
        }

        res
          .status(200)
          .json({ message: "Login successful", token, user: userData })
        return
      }
      res.status(401).json({ message: message || "Invalid credentials" })
    } catch (error) {
      next(error)
    }
  },
}

export default AuthController
