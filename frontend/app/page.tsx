import Image from "next/image";
import { ButtonFront } from "@/components/ButtonFront";

export default function Home() {
  return (
    <>      <div className="text-2xl ">
        
    hi
  </div>

    <ButtonFront link ={"http:localhost:3000/pages/api/auth/signup"} Name={"Signup"}/>
    <ButtonFront link ={"http:localhost:3000/pages/api/auth/signin"} Name={"Signin"}/>
    <ButtonFront link ={"http:localhost:3000/pages/api/QnA"} Name={"QnA"}/>
    </>
  );
}
