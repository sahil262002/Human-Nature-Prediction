"use client";


import { Loading } from "@/components/Loading";
import Result from "@/components/uesrResults";
import Details from "@/components/userDetail";
import axios from "axios";
import { useEffect, useState } from "react";
interface OutputFormat {
    outputByModel: number;
  }
interface ScoreFormat {
  id: string;
  outputs: OutputFormat[];
}

interface UserFormat {
  name: string;
  email: string;
  scores: ScoreFormat[];
}
export default function User() {
  const [loading, setLoading] = useState(true);
  const [details, setdetails] = useState<UserFormat>();
  //let details: format;
  useEffect(() => {
    setLoading(true);
    console.log(loading);
    try {
      axios
        .get(`${process.env.NEXT_PUBLIC_USER_PROFILE || ""}`, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data.user);
          setdetails(response.data.user);
          setLoading(false);
          console.log(loading);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);
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
  if (!details) {
    return (
      <div className="text-center flex-col content-center w-screen h-[calc(100vh-4rem)]">
        <p className="text-gray-600">No user data found.</p>
      </div>
    );
  }
  return (
    <>
      <div className="w-full h-[calc(100vh-4rem)] grid grid-cols-12">
        <div className=" col-start-3 col-end-6 flex justify-center">
          <div className="  cursor-pointer w-40 h-40 rounded-full bg-slate-300 mt-10 flex-col content-center">
            <div className="flex justify-center text-7xl text-slate-900">
              {details.name.slice(0, 1)}
            </div>
          </div>
        </div>
        <div className=" col-start-6 col-end-11 ">
          <div className="  mt-16 flex-col content-end">
            <div className="mt-4 mb-4 w-full h-24 border-solid border-2 border-slate-600 shadow-indigo-500/50 shadow-2xl">
              <Details
                name={details.name}
                email={details.email}
              />
            </div>
          </div>
          <div className=" ">
            <div>
              <Result score={details.scores} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
