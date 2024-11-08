import { Hono } from "hono";
import { PrismaClient, User } from "@prisma/client/edge";
import { user } from './routes/userAuth';
import {quest} from './routes/QnAHandler';

import { cors } from "hono/cors";
import { profile } from "./routes/userProfile";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const prisma = new PrismaClient();

app.use(
  "/api/*",
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);


app.route("api/v1/user" , user)

app.route("api/v1/quest", quest)

app.route("api/v1/user-profile" , profile)

app.get("/api/get", (c) => {
  return c.text("Hello Hono! sahil");
});

export default app;
