"use client";

import { links } from "@/backendRoute";
import { ButtonBack } from "@/components/ButtonBack";
import { Loading } from "@/components/Loading";
import { useState } from "react";

export default function Signup() {
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [loading, setLoading] = useState(false);
  const data = {
    name: name || "",
    email: email || "",
    password: password || "",
    prop: { loading, setLoading },
  };
  if (loading) {
    return (
      <>
        <div className="text-center flex-col content-center w-screen h-screen bg-slate-900">
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
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(() => e.target.value)}
      />
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
        link={links.signup}
        routeName="Signup"
      />
    </>
  );
}
