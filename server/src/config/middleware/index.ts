import dotenv from "dotenv"

dotenv.config()

const jwt = {
  secret: process.env.JWT_SECRET as string,
  expiresIn: "1h",
}

export default jwt
