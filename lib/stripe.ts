import Stripe from "stripe";
import { date, string } from "zod";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!,{
    typescript:true,
    apiVersion:"2023-08-16"
})