"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Loading } from "./Loading";

export default function Topbar() {
  const [loading, setLoading] = useState(true); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch user login status on mount
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_CHECK || "",
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
    setLoading(true);
    router.push(path);
  };

  const logouthandler = async () => {
    setLoading(true);
    try {
      await axios.get(process.env.NEXT_PUBLIC_LOGOUT || "", { withCredentials: true });
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
      <div className="text-center flex flex-col content-center w-screen h-screen">
        <div className="flex justify-center">
          <Loading />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-16 border-b border-gray-400 shadow-md bg-neutral-800 grid grid-cols-12">
      
      <div onClick={() => handler("/")}
        className="cursor-pointer col-span-3 flex items-center justify-center text-xl text-amber-500 font-mono font-semibold hover:text-amber-600 transition"
      >
        Human Nature Prediction
      </div>

      
      <div className="col-start-9 col-end-12 grid grid-cols-8 gap-4 items-center">
       
        <div className="col-span-2 flex justify-center">
{/*           <button
            onClick={() => handler("/")}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Home
          </button> */}
        </div>

        {isLoggedIn ? (
          <div className="col-span-2 flex justify-center">
            <button
              onClick={logouthandler}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              SignOut
            </button>
          </div>
        ) : (
          <div className="col-span-4 grid grid-cols-4 gap-2">
            <div className="col-span-2 flex justify-center">
              <button
                onClick={() => handler("/auth/signup")}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
              >
                SignUp
              </button>
            </div>
            <div className="col-span-2 flex justify-center">
              <button
                onClick={() => handler("/auth/signin")}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                SignIn
              </button>
            </div>
          </div>
        )}
        <div className="col-span-2 flex justify-center">
          <button
            onClick={() => handler("/Questions/Qna")}
            className="px-4 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
          >
            QNA
          </button>
        </div>
      </div>

      
      <div className="col-start-12 flex items-center justify-center">
        <div
          onClick={() => handler("/user")}
          className="cursor-pointer w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 transition"
          aria-label="User Profile"
        ></div>
      </div>
    </div>
  );
}
