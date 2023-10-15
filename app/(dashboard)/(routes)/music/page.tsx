"use client"

import * as z from "zod"
import axios from "axios";


import Heading from "@/components/heading";
import { FormControl, FormField,FormItem,Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletion, ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useState } from "react";
import {useProModal} from "@/hooks/use-pro-modal"
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import { Button } from "@/components/ui/button";

import Empty from "@/components/empty";
import { formSchema } from "./constants";
import Loader from "@/components/loader";

const MusicPage = () => {
    const proModal = useProModal()
    const router = useRouter();
    const [music,setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })

    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async(values:z.infer<typeof formSchema>) =>{
        try{
           setMusic(undefined);

           const response = await axios.post("/api/music",values);
           setMusic(response.data.audio);
           form.reset();
        }catch(error:any){
            if(error?.response?.status === 403){
                proModal.onOpen();
            }}
            
        finally{
            router.refresh();
        }
    }

    return ( 
        <div>
            <Heading 
            title="Music Genaration"
            description="Turn Your Prompt into Music"
            icon={Music}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
            />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="
                    rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    gap-2
                    ">
                    
                    <FormField
                    name="prompt"
                    render={({field})=>(
                        <FormItem className="m-0 p-0">
                            <FormControl className="m-0 p-0">
                                <Input
                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                disabled={isLoading}
                                placeholder="Piano Solo"
                                {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    ></FormField>
                        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                            Generate
                        </Button>
                    </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}

                    {!music && !isLoading && (
                        <Empty label = "No Music Generated" />
                    )}

                 {
                    music && (
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>
                    )
                 }
                </div>
            </div>
        </div>
     );
}
 
export default MusicPage;