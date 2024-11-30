"use client"

import Image from "next/image";
import { ButtonFront } from "@/components/ButtonFront";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";

export default function Home() {
  const [loading,setLoading] =useState(false);
  const load ={
    loading,setLoading
  }
  if (loading) {
    return (
      <>
        <div className="text-center flex-col content-center w-screen h-[calc(100vh-4rem)]">
          <div className=" flex justify-center">
            <Loading />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {" "}
      <div className="text-2xl  ">hi</div>
      <Toaster />
      <ButtonFront
        link={"/auth/signup"}
        Name={"Signup"}
        loading={load}
      />
      <ButtonFront
        link={"/auth/signin"}
        Name={"Signin"}
        loading={load}
      />
      <ButtonFront
        link={"/Questions/Qna"}
        Name={"QnA"}
        loading={load}
      />
    </>
  );
}
