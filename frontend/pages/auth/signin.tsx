

import { links } from "@/backendRoute";
import { ButtonBack } from "@/components/ButtonBack";
import { useEffect, useState } from "react";

export default function Signin() {
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originConsoleError = window.console.error;
      // ... use originConsoleError here ...
    }
  }, []);
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
