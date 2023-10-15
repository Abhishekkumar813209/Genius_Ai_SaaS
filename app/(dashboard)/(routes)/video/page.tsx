"use client"

import * as z from "zod"
import axios from "axios";


import Heading from "@/components/heading";
import { FormControl, FormField,FormItem,Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import { Button } from "@/components/ui/button";

import Empty from "@/components/empty";
import { formSchema } from "./constants";
import Loader from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";

const VideoPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [video,setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            prompt:""
        }
    })

    const isLoading = form.formState.isSubmitting;
    
    const onSubmit = async(values:z.infer<typeof formSchema>) =>{
        try{
           setVideo(undefined);

           const response = await axios.post("/api/video",values);
           setVideo(response.data[0]);
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
            title="Video Genaration"
            description="Turn Your Prompt into Video"
            icon={VideoIcon}
            iconColor="text-orange-700"
            bgColor="bg-orange-700/10"
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
                                placeholder="Clown fish Swimming around a coral reef"
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

                    {!video && !isLoading && (
                        <Empty label = "No Video Generated" />
                    )}

                 {
                    video && (
                        <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
                            <source src={video} />
                        </video>
                    )
                 }
                </div>
            </div>
        </div>
     );
}
 
export default VideoPage;