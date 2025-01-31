import express from "express";
import "dotenv/config";
import { connectToDB } from "./connection/db.js";
import cors from "cors";
import todoRouter from "./routes/todoRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectToDB();

app.use("/api/todos", todoRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
