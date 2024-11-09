import { Hono } from "hono";
import {
  PrismaClient,
  User,
  Score,
  Records,
} from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

export const record = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

record.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const cookies = await getCookie(c, "token");
  console.log(cookies);

  try {
    if (!cookies) {
      return c.json({
        message: "you are not logged in",
      });
    } else if (cookies) {
      const verif = await verify(cookies, c.env.JWT_SECRET);
      if (!verif) {
        return c.json({
          message: "you are not logged in",
        });
      } else {
        await next();
      }
    }
  } catch (err) {
    return c.json({ message: err });
  }
});

record.get("/:id", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const recordid = await c.req.param('id');
  
  try{
    if(!recordid){
        return c.json({ message: "invalid id" });
    }
    else{
        const record = await prisma.records.findUnique({
            where: { id: recordid },
            select:{
                inputs:{
                    select:{
                        inputByUser:true,
                    }
                }
            }
        })
        if(!record){
            return c.json({ message: "invalid recordid"});
        }
        else {
            return c.json({record});
        }
    }
    
  }
  catch(err) {
    return c.json({err});
  }
});
