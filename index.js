import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL

app.use(
    cors({
      origin: [process.env.ORIGIN], //frontend urls which send requests
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true, //enable cookies
    })
  );

  app.use(cookieParser())
  app.use(express.json())

  app.use("/api/auth", authRoutes);

const server = app.listen(PORT, ()=>{
    console.log(`Server running successfully at: http://localhost:${PORT}`)
})

mongoose.connect(databaseURL).then(() => {
    console.log("DB Running Successfully");
  })
  .catch((err) => console.log(err.message));