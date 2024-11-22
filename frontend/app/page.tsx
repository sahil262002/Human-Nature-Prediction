"use client"

import Image from "next/image";
import { ButtonFront } from "@/components/ButtonFront";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading,setLoading] =useState(false);
  const load ={
    loading,setLoading
  }
  return (
    <>
      {" "}
      <div className="text-2xl ">hi</div>
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
