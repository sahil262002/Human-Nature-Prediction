import { links } from "@/backendRoute";
import { ButtonBack } from "@/components/ButtonBack";
import { useState } from "react";

export function Signup() {
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const data = {
    name : name || "",
    email : email || "",
    password : password || "",
  };

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
      <ButtonBack userInputs={data} link={links.signup} routeName="Signup"/>
    </>
  );
}
