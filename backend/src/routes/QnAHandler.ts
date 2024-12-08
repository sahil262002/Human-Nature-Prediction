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
    M_URL: string;
  };
}>();

const fetchWithTimeout = (
  url: string,
  options: RequestInit,
  timeout: number
) => {
  return new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Request timed out")),
      timeout
    );

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
};

quest.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log("Cookie checking...");
  const cook = await getCookie(c);
  console.log(cook);

  try {
    if (!cook) {
      return c.json({
        message: "you are not logged in bro",
        loggedIn: false,
      });
    } else if (cook) {
      const verif = await verify(
        cook.token,
        c.env.JWT_SECRET
      );
      if (!verif) {
        return c.json({
          message: "you are not logged in",
          loggedIn: false,
        });
      } else {
        // return c.json({
        //   loggedIn: true,
        // });
        await next();
      }
    }
  } catch (err) {
    return c.json({ message: err });
  }
});

quest.post("/check", async (c) => {
  return c.json({
    message: "checking",
    loggedIn: true,
  });
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
    let newarr = [];
    let donePredicitions = false;
    for (let i = 0; i < inputs.data.length; i++) {
      if (
        inputs.data[i].ans === null ||
        inputs.data[i].ans > 10
      ) {
        invalidNumberIndex = i;
        await prisma.score.deleteMany({
          where: { recordId: Quest.id },
        });
        await prisma.records.delete({
          where: { id: Quest.id },
        });
        return c.json({
          invalidInput: true,
          invalidAtIndex: invalidNumberIndex,
        });
      } else {
        let creating = newarr.push(
          prisma.score.create({
            data: {
              recordId: Quest.id,
              inputByUser: inputs.data[i].ans,
            },
          })
        );
        (arr[i] = inputs.data[i].ans)
          //console.log(creating, "creating");
      }
    }
    await Promise.all(newarr);

    try {
      const prediction = await fetchWithTimeout(
        c.env.M_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ features: arr }),
        },
        5000
      );

      if (!prediction.ok) {
        throw new Error(
          "Prediction service responded with an error"
        );
      } else {
        const predictionBody: any = await prediction.json();
        const predicts = predictionBody.predicted_labels;
        const set = new Set<number>();
        const array: number[] = [];
        const promises = [];

        for (let i = 0; i < predicts.length; i++) {
          if (!set.has(predicts[i])) {
            set.add(predicts[i]);
            array.push(predicts[i]);
            promises.push(
              prisma.result.create({
                data: {
                  recordId: Quest.id,
                  outputByModel: predicts[i],
                },
              })
            );
          }
        }
        await Promise.all(promises);
        donePredicitions = true;

        return c.json({
          message: "success",
          donePredicitions: donePredicitions,
          prediction: array,
        });
      }
    } catch (err) {
      console.error("Prediction service failed:", err);
      await prisma.score.deleteMany({
        where: { recordId: Quest.id },
      });
      await prisma.records.delete({
        where: { id: Quest.id },
      });
      return c.json({
        message: "Prediction service unavailable",
        invalidInput: true,
      });
    }
  } catch (err) {
    return c.json({ message: err });
  }
});
