
import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import helmet from "helmet";
import cors from "cors";
import { getCorsOptions } from "../config/corsConfig";
import setupSwagger from "../config/swagger";

const app = express();

const apiHelmetConfig = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,

  
  hidePoweredBy: true,
  noSniff: true,
  frameguard: { action: "deny" },

  
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },

 
  referrerPolicy: { policy: "no-referrer" },
});

app.use(apiHelmetConfig);


// Setup Swagger
setupSwagger(app);
app.use(morgan("combined"));

app.use(cors(getCorsOptions()));

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);

app.use(cors());

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Simple health check for the API
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: API is up and running
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Server is healthy"
 */

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
