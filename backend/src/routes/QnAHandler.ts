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
  console.log(inputs);

  try {
    let Quest: Records = await prisma.records.create({
      data: {
        userId: userid,
      },
    });
    let arr: number[] = [];
    let invalidNumberIndex;
    let donePredicitions=false;
    for (let i = 0; i < inputs.data.length; i++) {
      if (inputs.data[i].ans === null || inputs.data[i].ans>10) {
        invalidNumberIndex = i;
        await prisma.score.deleteMany({
          where: { recordId: Quest.id },
        });
        await prisma.records.delete({
          where: { id: Quest.id },
        });
        return c.json({
          invalidInput:true,
          invalidAtIndex:invalidNumberIndex
        })
      }
      else{let creating = await prisma.score.create({
        data: {
          recordId: Quest.id,
          inputByUser: inputs.data[i].ans,
        },
      });
      (arr[i] = inputs.data[i].ans), console.log(creating);}
    }

    const prediction = await fetch(
      "http://localhost:5314/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: arr }),
      }
    );
    const predictionBody: any = await prediction.json();

    const predicts = predictionBody.predicted_labels;

    console.log(predicts);
    donePredicitions=true;
    //console.log(inputs);
    // console.log(Quest);
    // console.log(prediction);
    return c.json({
      message: "success",
      donePredicitions:donePredicitions,
      prediction: predicts,
    });
  } catch (err) {
    return c.json({ message: err });
  }
});
