"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { links } from "@/backendRoute";
import { Loading } from "./Loading";

export default function Topbar() {
  const [loading, setLoading] = useState(true); // Loading starts true until data is fetched
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch user login status on mount
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          links.check,
          {},
          {
            withCredentials: true,
          }
        );
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("Error checking login status", error);
      } finally {
        setLoading(false);
      }
    };
    checkLoginStatus();
  }, [loading]);

  const handler = (path: string) => {
    setLoading(true)
    router.push(path);
    
  };

  const logouthandler = async () => {
    setLoading(true);
    try {
      await axios.get(links.logout, { withCredentials: true });
      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.error("Error during logout", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center flex-col content-center w-screen h-dvh">
        <div className="flex justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-16 border-b border-opacity-50 shadow-slate-500 bg-neutral-800 opacity-85 grid grid-cols-12">
      <div
        onClick={() => handler("/")}
        className="cursor-pointer col-span-3 text-center flex flex-col justify-center text-xl text-amber-600 text-pretty font-mono font-semibold"
      >
        Human Nature Prediction
      </div>
      <div className="col-start-10 col-end-12 grid grid-cols-8">
        {isLoggedIn ? (
          <div className="col-span-2 flex flex-col justify-center">
            <p
              onClick={logouthandler}
              className="cursor-pointer"
            >
              SignOut
            </p>
          </div>
        ) : (
          <div className="col-span-4 grid grid-cols-4">
            <div className="col-start-1 col-end-3 flex flex-col justify-center">
              <p
                onClick={() => handler("/auth/signup")}
                className="cursor-pointer"
              >
                SignUp
              </p>
            </div>
            <div className="col-start-3 col-end-5 flex flex-col justify-center">
              <p
                onClick={() => handler("/auth/signin")}
                className="cursor-pointer"
              >
                SignIn
              </p>
            </div>
          </div>
        )}
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
          className="cursor-pointer w-10 h-10 rounded-full bg-red-50"
        ></div>
      </div>
    </div>
  );
}
