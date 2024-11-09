import { links } from "@/backendRoute";
import { ButtonBack } from "@/components/ButtonBack";
import { useState } from "react";

export function Signup() {
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  const data = {
    email : email || "",
    password : password || "",
  };

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
      <ButtonBack userInputs={data} link={links.signin} routeName="SignIn"/>
    </>
  );
}
