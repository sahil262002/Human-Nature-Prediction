"use client";
import { useState } from "react";
import { QuestFormat, data } from "./data";
import axios from "axios";
import { links } from "@/backendRoute";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Stepper from "@/components/Stepper";
import Pages from "@/components/qnaPages";
import { Loading } from "@/components/Loading";

export default function QnA() {
  const [qna, setQna] = useState<QuestFormat[]>(data);
  const [next, setNext] = useState(0);
  const [loading ,setLoading]= useState(false);
  if(loading){
    return (
      <div className="text-center flex-col content-center w-screen h-screen">
        <div className="flex justify-center">
          <Loading />{" "}
          {/* This is where the Loading component is used */}
        </div>
      </div>
    )
  }
  return (
    <>
      <Toaster />
      <div className="h-screen w-screen flex-col content-center">
        <div className="flex justify-center">
          <div className="">
            <div className="mb-10 ">
              <Stepper next = {next}/>
            </div>
            <div className="">
            <Pages next={next} setNext={setNext} qna={qna} setQna={setQna} loading={loading} setLoading={setLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
