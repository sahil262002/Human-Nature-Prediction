import Image from "next/image";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <>
    <Button link ={"http:localhost:3000/pages/api/auth/signup"} Name={"Signup"}/>
    <Button link ={"http:localhost:3000/pages/api/auth/signin"} Name={"Signin"}/>
    <Button link ={"http:localhost:3000/pages/api/QnA"} Name={"QnA"}/>
    </>
  );
}
