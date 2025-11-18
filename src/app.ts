import express, { Request, Response } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

import { db } from "../config/firebaseConfig";

if (process.env.NODE_ENV !== "test") {
  db.listCollections().then((collections) => {
    console.log("Firestore connected! Collections:", collections.map((c) => c.id));
  });
}

export default app;
