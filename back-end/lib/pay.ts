import Stripe from "stripe";
import { Response , Request } from "express";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});




export default  async function (amount:number , 
    paymentmethodId:string , customer:string){

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency:"usd",
        customer:customer,
        payment_method:paymentmethodId,
        confirm:true
    })

    if (paymentIntent.status ==="succeeded"){
    
        return {success:true, message:"payment was successful"}
    }else if (!paymentIntent.customer || !paymentIntent.payment_method){
        return {success:false , message:"you must provide customer id or payment id" }
    }
    else{
        return { success: false, error: "Payment failed, please try again" };
    }
}
