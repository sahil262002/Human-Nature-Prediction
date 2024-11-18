"use client";

import axios from "axios";
import { useState } from "react";

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
  function sendDataToBackend() {
    userInputs.prop.setLoading(true);
    axios
      .post(link, {
        name: userInputs.name,
        email: userInputs.email,
        password: userInputs.password,
      })
      .then((response) => {
        console.log(
          "Data sent successfully:",
          response.data
        );
      })
      .then(() => userInputs.prop.setLoading(false))
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  }
  return (
    <>
      <button onClick={sendDataToBackend}>
        {routeName}
      </button>
    </>
  );
}
