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
export const quest = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

quest.use("/*", async (c, next) => {
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

quest.post("/question", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const inputs = await c.req.json();
  const cookies = await getCookie(c, "token");
  const { payload } = await decode(cookies || "");
  const userid: string = payload.id as string;
  console.log(userid);
  console.log(inputs.data[1].ans);

  try {

    let Quest: Records = await prisma.records.create(
      {
        data: {
          userId: userid,
        },
      }
    );
    let arr: number [] = [];
    
    for(let i = 0 ; i < inputs.data.length ; i++){
      let creating = await prisma.score.create({
        data: {
          recordId: Quest.id,
          inputByUser : inputs.data[i].ans

        }
      })
      arr[i] = inputs.data[i].ans,
      console.log(creating)
    }

    // const prediction = await axios.post("http:localhost:8000",{
    //   data : arr,
    // })

    const prediction = await fetch("http://localhost:3000",{
      method: "POST",
      body : JSON.stringify({data : arr})
    })

    //console.log(inputs);
    console.log(Quest);
    return c.json({message : "success"})

  } catch (err) {
    return c.json({ message: err });
  }
});
