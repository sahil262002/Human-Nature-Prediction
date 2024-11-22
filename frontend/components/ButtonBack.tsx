"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

          router.push("/");
          userInputs.prop?.setLoading(false);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button onClick={sendDataToBackend}>{routeName}</button>
  );
}
