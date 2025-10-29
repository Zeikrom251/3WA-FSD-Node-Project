import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import path from "path"
import applyRateLimit from "./config/middleware/rateLimit"
import apiRoutes from "./routes/index"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(applyRateLimit)

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Furniture Management API is running",
    timestamp: new Date().toISOString(),
  })
})

app.get("/", (req, res) => {
  res.render("index", {
    title: "Furniture Management API",
    message: "Backend API pour l'application de gestion des meubles",
  })
})

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

app.use("/api", apiRoutes)

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack)
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    })
  }
)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Environment: ${process.env.NODE_ENV}`)
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`)
})

export default app
