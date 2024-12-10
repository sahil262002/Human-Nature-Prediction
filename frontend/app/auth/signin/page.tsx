"use client";

import { ButtonBack } from "@/components/ButtonBack";
import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";

export default function Signin() {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const data = {
    email: email,
    password: password,
    prop: { loading, setLoading },
  };

  if (loading) {
    return (
      <>
        <div className="text-center flex-col content-center w-screen h-[calc(100vh-4rem)]">
          <div className="flex justify-center">
            <Loading />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-center flex-col content-center w-screen h-[calc(100vh-4rem)]">
        <div className=" flex justify-center">
          <div className="border-solid border-2 border-slate-600 rounded-lg border-t-4  shadow-indigo-700  shadow-2xl">
            <div className="m-3 text-center">
              <div>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <ButtonBack
                  userInputs={data}
                  link={process.env.NEXT_PUBLIC_SIGNIN || ""}
                  routeName="SignIn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
