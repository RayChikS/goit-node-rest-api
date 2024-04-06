import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import contactsRouter from "./routes/contactsRouter.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;
const connection = mongoose.connect(process.env.DB_HOST);
connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, function () {
      console.log(
        `Server running. Use our API on port: http://localhost:${PORT}/`
      );
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
