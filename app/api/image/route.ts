import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Configuration from "openai"
import OpenAI from "openai";
import {increaseApiLimit,checkApiLimit} from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription";



const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
})

export async function POST(
    req:Request 
    ) {
        try{
            const {userId} = auth();
            const body = await req.json();
            const {prompt,amount = 1, resolution="512x512"} = body;
            
            if(!userId){
                return new NextResponse("Unauthorized",{status:401});
            }
            if(!openai.apiKey){
                return new NextResponse("OpenAI API Key not required",{status:500});
            }
            if(!prompt){
                return new NextResponse("Prompt is  Required",{status:400});
            }

            if(!amount){
                return new NextResponse("Amouont is required",{status:400});
            }

            if(!resolution){
                return new NextResponse("Resolution is  Required",{status:400});
            }
            const freeTrial = await checkApiLimit();
            const isPro = await checkSubscription();

            if(!freeTrial && !isPro){
                return new NextResponse("Free Trial has expired.",{status:403});
            }

            // console.log(openai)
            const response = await openai.images.generate({
                prompt,
                n:parseInt(amount,10),
                size:resolution,
            })

            if(!isPro){
                await increaseApiLimit();
            }
            console.log(response.data);
            const [{url}] = response.data;
            console.log(typeof response.data);
            await increaseApiLimit();

            return NextResponse.json(url);

        }catch(error){
            console.log('IMAGE_ERROR',error);
            return new NextResponse("Internal error",{status:500});
        }
}