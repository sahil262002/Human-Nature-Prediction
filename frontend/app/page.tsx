"use client"

import Image from "next/image";
import { ButtonFront } from "@/components/ButtonFront";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const load = {
    loading,
    setLoading
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
      <div className="text-2xl"></div>
      <Toaster />
      <div className="foreground-image w-full h-[83vh] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 bg-transparent shadow-lg shadow-blue-500 rounded-md max-w-xs w-full p-8 border-2 border-slate-1000">
          <div className="text-white font-bold text-2xl">Welcome!</div>
          <ButtonFront link={"/auth/signup"} Name={"Signup"} loading={load} />
          <ButtonFront link={"/auth/signin"} Name={"Signin"} loading={load} />
          <ButtonFront link={"/Questions/Qna"} Name={"QnA"} loading={load} />
        </div>
      </div>
    </>
  );
}
