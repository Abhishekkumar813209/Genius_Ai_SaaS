"use client";

import { useEffect,useState } from "react";

interface FreeCounterProps{
    apiLimitCount:number;
}


export const FreeCounter = ({
    apiLimitCount=0
}:FreeCounterProps) =>{
    const [mounted,setMounted] = useState(false);

    

    useEffect(()=>{
        setMounted(true);
    },[])
    return (
        <div>
            Free Counter
        </div>
    )
}