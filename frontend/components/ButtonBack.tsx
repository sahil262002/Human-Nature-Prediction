"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

interface data {
  name?: string;
  email: string;
  password: string;
  prop?: any;
}

export function ButtonBack({
  userInputs,
  link,
  routeName,
}: {
  userInputs: data;
  link: string;
  routeName: string;
}) {
  const router = useRouter();

  function sendDataToBackend() {
    try {
      userInputs.prop?.setLoading(true);
      axios
        .post(
          link,
          {
            name: userInputs.name,
            email: userInputs.email,
            password: userInputs.password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log(
            "Data sent successfully:",
            response.data
          );
          const fetched = response.data;

          if (fetched.error) {
            toast.error(`${fetched.message}`);
          } else {
            toast.success("Verified successfully");
            router.push("/");
          }
          userInputs.prop?.setLoading(false);
        })
        .catch((error) => {
          userInputs.prop?.setLoading(false);
          //toast.error("Something went wrong ");
        });
    } catch (err) {
      toast.error("Something went wrong ");
      console.log(err);
    }
  }

  return (
    <>
      <Toaster />
      <button
        onClick={sendDataToBackend}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {routeName}
      </button>
    </>
  );
}
