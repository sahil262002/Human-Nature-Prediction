"use client";
import { useEffect, useState } from "react";
import { QuestFormat, data } from "./data";
import axios from "axios";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Stepper from "@/components/Stepper";
import Pages from "@/components/qnaPages";
import { Loading } from "@/components/Loading";
import { ButtonFront } from "@/components/ButtonFront";

export default function QnA() {
  const [qna, setQna] = useState<QuestFormat[]>(data);
  const [next, setNext] = useState(0);
  const [loading, setLoading] = useState(false);
  const [check, setcheck] = useState(true);
  const [pred, setPred] = useState(false);
  const load = { loading, setLoading };

  useEffect(() => {
    const interval = setTimeout(() => {
      axios
        .post(
          process.env.NEXT_PUBLIC_CHECK || "",
          {},
          {
            withCredentials: true, // Include cookies in the request
          }
        )
        .then((response) => {
          console.log(response.data);
          if (!response.data.loggedIn) {
            setcheck(false);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }, 5000);
    return () => clearTimeout(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center flex-col content-center w-screen h-screen">
        <div className="flex justify-center">
          <Loading />{" "}
          {/* This is where the Loading component is used */}
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div
        className="h-full w-screen flex-col content-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpg')", // Path to your background image
        }}
      >
        <div className="flex justify-center mt-6">
          <div className="">
            <div className="mb-10">
              {!pred ? (
                <Stepper next={next} />
              ) : (
                <h3>Your Nature Could Be</h3>
              )}
            </div>
            <div className="">
              <Pages
                next={next}
                setNext={setNext}
                qna={qna}
                setQna={setQna}
                loading={loading}
                setLoading={setLoading}
                pred={pred}
                setPred={setPred}
              />
            </div>
          </div>

          {/* Modal overlay for when the user is not signed in */}
          {!check && (
            <div className="absolute top-0 left-0 w-full h-[calc(100vh-4rem)] bg-black bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-slate-400 opacity-90 p-8 rounded shadow-lg text-center">
                <p className="text-lg font-semibold">
                  You need to SignIn / SignUp to continue.
                </p>
                <div className="">
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
