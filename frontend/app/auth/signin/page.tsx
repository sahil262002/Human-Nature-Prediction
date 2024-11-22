"use client"
import { links } from "@/backendRoute";
import { ButtonBack } from "@/components/ButtonBack";
import { Loading } from "@/components/Loading";
import { useEffect, useState } from "react";

export default function Signin() {
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState(false);

  const data = {
    email: email || "",
    password: password || "",
    prop: { loading, setLoading },
  };

  if (loading) {
    return (
      <>
        <div className="text-center flex-col content-center w-screen h-screen">
          <div className=" flex justify-center">
            <Loading />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(() => e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(() => e.target.value)}
      />
      <ButtonBack
        userInputs={data}
        link={links.signin}
        routeName="SignIn"
      />
    </>
  );
}
