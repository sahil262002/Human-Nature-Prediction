"use client"

import { useRouter } from "next/navigation"
import { Loading } from "./Loading";



export function ButtonFront({link, Name, loading}:{link : String , Name : String, loading: any }){
    const router = useRouter();
    function handler(){
        loading.setLoading(true);
        router.push(`${link}`)
        loading.setLoadin(false);
    }
    return (
        <>
        <button onClick={handler}>
            {Name}
        </button>
        </>
    )
}