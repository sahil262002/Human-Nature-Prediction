"use client"

import { useRouter } from "next/navigation"



export function ButtonFront({link, Name}:{link : String , Name : String }){
    const router = useRouter();
    return (
        <>
        <button onClick={()=>router.push(`${link}`)}>
            {Name}
        </button>
        </>
    )
}