"use client"

import axios from "axios";

interface data {
  name?: string;
  email: string;
  password: string;
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
    axios
      .post(link, {
        name: userInputs.name,
        email: userInputs.email,
        password: userInputs.password,
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  }
  return (
    <>
      <button onClick={sendDataToBackend}>{routeName}</button>
    </>
  );
}
