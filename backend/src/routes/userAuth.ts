// it is routes for the user to login and sign up

import { Hono } from "hono";
import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import {
  setCookie,
  deleteCookie,
  getCookie,
} from "hono/cookie";
import { signPassword, verifyPassword } from "./encryption";

export const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();


user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
 // console.log(body);

  // let userCreation: User;

  try {
    const emailverification = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (emailverification) {
      return c.json({
        message: "Email already is use",
        error: true,
      });
    }
    const hashedPassword: any = await signPassword(
      body.password,
      10
    );
    if (!hashedPassword) {
      return c.json({ message: "Something went wrong. Please try later" ,
        error : true
      });
    }
    const userCreation = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    //console.log(userCreation);
    const jwt = await sign(
      { id: userCreation.id, name: userCreation.name },
      c.env.JWT_SECRET
    );

    //console.log(jwt);

    setCookie(c, "token", jwt, {
      secure:true,
      httpOnly: true,
      maxAge: 345600,
      sameSite: "None",
      path: "/",
    });

    return c.json({ message: jwt });
  } catch (error: any) {
    //c.status(403);
    return c.json({ message: "Something went wrong. Please try later",
      error : true
     });
  }
});

user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const matching = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!matching) {
      return c.json({
        message: "User not Found. Check your inputs",
        error: true
      });

    }
    const match = await verifyPassword(
      body.password,
      matching.password,
      10
    );
    if (!match) {
      console.log("matcht ", match);
      // console.log("matching.passwrods",matching.password),
      // console.log("body.passwrods",body.password)

      return c.json({ message: "User not Found. Check your inputs" ,
        error: true
      });
    }

    if (match) {
      const jwt = await sign(
        {
          id: matching.id,
          name: matching.name,
        },
        c.env.JWT_SECRET
      );

      setCookie(c, "token", jwt, {
        secure:true,
        httpOnly: true,
        maxAge: 345600,
        sameSite: "None",
        path: "/",
      });
      console.log("match", match);
      return c.json({
        message: `${jwt} succefully logged in`,
        error: false
      });
    }
  } catch (error) {
    return c.json({ message: error });
  }
});

user.get("/logout", async (c) => {
  
  const deletedCookie = await deleteCookie(c, "token", {
    path: "/",
    sameSite: "None",
    secure: true, 
    httpOnly: true, 
  });

  
  console.log("Deleted cookie:", deletedCookie);

  
  const body = getCookie(c, "token");
  console.log("Cookie after deletion:", body); 

  return c.json({
    message: "You are successfully logged out",
  });
});


user.post("/:id", async (c) => {});
