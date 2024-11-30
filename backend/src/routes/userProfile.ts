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
import { signPassword, verifyPassword } from "./encryption";

export const profile = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    accessFlags: boolean;
  };
}>();

profile.use("/*", async (c, next) => {
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

profile.get("/id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const cookies = await getCookie(c, "token");
    const { payload } = await decode(cookies || "");
    const userid: string = payload.id as string;
    console.log(userid,"sahil ");
    if (!userid) {
      return c.json({ message: "invalid id" });
    } else {
      const user = await prisma.user.findUnique({
        where: { id: userid },
        select: {
          name: true,
          email: true,
          scores: {
            select: {
              id: true,
              outputs: {
                select: {
                  outputByModel: true,
                },
              },
            },
          },
        },
      });
      if (!user) {
        return c.json({ message: "invalid userid" });
      } else {
        return c.json({ user });
      }
    }
  } catch (err) {
    return c.json({ err });
  }
});

profile.post("/change", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const inputs = await c.req.json();

  try {
    const cookies = await getCookie(c, "token");
    const { payload } = await decode(cookies || "");
    const userid: string = payload.id as string;
    console.log(userid);
    if (!userid) {
      return c.json({ message: "invalid userid" });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: userid,
        },
      });
      if (!user) {
        return c.json({ message: "user doest not exist" });
      }
      const matched = await verifyPassword(
        inputs.password,
        user.password,
        10
      );
      if (matched) {
        await c.set("accessFlags", true);
        return c.json({ message: "password matched" });
      } else {
        await c.set("accessFlags", false);
        return c.json({
          message:
            "password not matched , check your password",
        });
      }
    }
  } catch (err) {}
});
profile.put("/changepassword", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  //const userid = await c.req.param("id");
  const { newPassword, oldPassword } = await c.req.json();
  const check = await c.get("accessFlags");

  try {
    const cookies = await getCookie(c, "token");
    const { payload } = await decode(cookies || "");
    const userid: string = payload.id as string;
    console.log(userid);
    if (!check) {
      return c.json({
        message: "you don't have permission to access this",
      });
    } else if (!userid) {
      return c.json({
        message: "you don't have permission to access this",
      });
    } else {
      const user = await prisma.user.findUnique({
        where: {
          id: userid,
        },
      });
      if (!user) {
        return c.json({ message: "user not found" });
      }
      const match = await verifyPassword(
        oldPassword,
        user.password,
        10
      );

      if (match) {
        const hashedPassword: any = await signPassword(
          newPassword,
          10
        );
        if (!hashedPassword) {
          return c.json({
            message: hashedPassword,
          });
        }
        const updating = await prisma.user.update({
          where: { id: userid },
          data: { password: hashedPassword },
        });
        if (updating) {
          await c.set("accessFlags", false);
          return c.json({
            message: "successfully updated",
          });
        }
      }
      return c.json({
        message:
          "there is some error from our side please try later",
      });
    }
  } catch (err) {
    return c.json({ message: err });
  }
});
