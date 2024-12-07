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
  
  // Helper function for navigation
  function handler(prop: string) {
    setLoading(true);
    router.push(prop);
    setLoading(false);
  }

  // Logout handler
  function logouthandler(): void {
    setLoading(true);
    axios
      .get(links.logout, { withCredentials: true })
      .then(() => {
        router.push("/");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  // Show loading screen while loading
  if (loading) {
    return (
      <div className="text-center flex-col content-center w-screen h-[calc(100vh-4rem)]">
        <div className="flex justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-16 border-b border-opacity-50 shadow-slate-500 bg-neutral-800 opacity-85 grid grid-cols-12">
      {/* Left side: App name */}
      <div
        onClick={() => handler("/")}
        className="cursor-pointer col-span-3 text-center flex flex-col justify-center text-xl text-green-500 font-mono font-semibold"
      >
        Human Nature Prediction
      </div>

      {/* Middle: Links to different pages */}
      <div className="col-start-8 col-end-12 grid grid-cols-5 gap-4">
        <div className="flex justify-center items-center">
          <p onClick={() => handler("/")} className="cursor-pointer text-white">
            Home
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p onClick={() => handler("/auth/signup")} className="cursor-pointer text-white">
            SignUp
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p onClick={() => handler("/auth/signin")} className="cursor-pointer text-white">
            SignIn
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p onClick={logouthandler} className="cursor-pointer text-white">
            SignOut
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p onClick={() => handler("/Questions/Qna")} className="cursor-pointer text-white">
            QnA
          </p>
        </div>
      </div>

      {/* Right side: User Profile Icon */}
      <div className="col-start-12 flex justify-center items-center">
        <div
          onClick={() => handler("/user")}
          className="cursor-pointer w-10 h-10 rounded-full bg-red-50"
        >
          {/* You can add a user profile image here */}
        </div>
      </div>
    </div>
  );
}
