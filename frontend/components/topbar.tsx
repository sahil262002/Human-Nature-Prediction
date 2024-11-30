"use client";
import { useState } from "react";
import { ButtonFront } from "./ButtonFront";
import { useRouter } from "next/navigation";
import axios from "axios";
import { links } from "@/backendRoute";
import { Loading } from "./Loading";

export default function Topbar() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const load = {
    loading,
    setLoading,
  };
  function handler(prop: string) {
    setLoading(true);
    router.push(`${prop}`);
    setLoading(false);
  }
  // async function userHandler(prop: string) {
  //   setLoading(true);
  //   console.log(loading);
  //   try {
  //     await axios
  //       .get(`${links.userProfile}`, {
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         console.log(response.data);

  //         setLoading(false);
  //         console.log(loading)
  //         router.push(`${prop}`);
  //       })
  //       .catch((e)=>{
  //         console.log(e)
  //         setLoading(false);
  //       })
  //   } catch (e) {
  //     console.log(e);
  //     setLoading(false);
  //   }

  // }
  function logouthandler(): void {
    setLoading(true);
    try{
      axios.get(links.logout,  { withCredentials: true })
    .then((res)=>{
      router.push("/")
      setLoading(false)

    })
    }catch(e){
      setLoading(false)
    }
  }
  if (loading) {
    return (
      <>
        <div className="text-center flex-col content-center w-screen h-dvh">
          <div className=" flex justify-center">
            <Loading />
          </div>
        </div>
      </>
    );
  }
  

  return (
    <>
      <div className="w-full h-16 border-b border-opacity-50  shadow-slate-500  bg-neutral-800 opacity-85 grid grid-cols-12">
        <div
          onClick={() => handler("/")}
          className="cursor-pointer col-span-3 text-center flex flex-col  justify-center text-xl text-amber-600 text-pretty font-mono font-semibold"
        >
          Human Nature Prediction
        </div>
        <div className="col-start-10 col-end-12 grid grid-cols-8">
          <div className="col-span-2 flex flex-col justify-center ">
            <p
              onClick={() => handler("/auth/signup")}
              className="cursor-pointer"
            >
              SignUp
            </p>
          </div>
          <div className="col-span-2 flex flex-col justify-center">
            <p
              onClick={() => handler("/auth/signin")}
              className="cursor-pointer"
            >
              SignIn
            </p>
          </div>
          <div className="col-span-2 flex flex-col justify-center">
            <p
              onClick={() => logouthandler()}
              className="cursor-pointer"
            >
              SignOut
            </p>
          </div>
          <div className="col-span-2 flex flex-col justify-center">
            <p
              onClick={() => handler("/Questions/Qna")}
              className="cursor-pointer"
            >
              QNA
            </p>
          </div>
        </div>
        <div className="col-start-12 flex flex-col justify-center">
          <div
            onClick={() => handler("/user")}
            className="cursor-pointer w-10 h-10 rounded-full bg-red-50 "
          ></div>
        </div>
      </div>
    </>
  );
}
