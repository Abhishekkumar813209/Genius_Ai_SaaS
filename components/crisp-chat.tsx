"use client";

import {useEffect} from "react";
import {Crisp} from "crisp-sdk-web"

export const CrispChat = () =>{
    useEffect(()=>{
        Crisp.configure
        ("8985f8b8-3cbb-4c6b-aa34-8c23ca13d46d");
    },[])

    return null;
}