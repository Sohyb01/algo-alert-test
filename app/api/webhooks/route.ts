import Stripe from "stripe";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-10-16",
});

const webhookSecret: string = `${process.env.STRIPE_WEBHOOK_SECRET!}`;

const webhookHandler = async (req: NextRequest) => {
  console.log(`request: ${req}`);
  console.log(`sig: ${req.headers.get("stripe-signature")}`);
  try {
    const buf = await req.text();
    const sig = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        `${req.headers.get("stripe-signature")}`,
        webhookSecret! // Secret goes here
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err);
      console.log(`buf: ${buf}, sig: ${sig}, secret: ${webhookSecret}`);
      console.log(`❌ Error message: ${errorMessage}`);

      return NextResponse.json(
        {
          error: {
            message: `Webhook Error: ${errorMessage}`,
          },
        },
        { status: 400 }
      );
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // getting to the data we want from the event
    const subscription = event.data.object as Stripe.Subscription;
    console.log(`Subscription: ${subscription}`);
    const subscriptionId = subscription.id;
    console.log(`Subscription: ${subscriptionId}`);

    switch (event.type) {
      case "customer.subscription.created":
        console.log(`customer.subscription.created detected`);
        await prisma.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: true,
            subscriptionID: subscriptionId,
          },
        });
        break;
      case "customer.subscription.deleted":
        console.log(`customer.subscription.deleted detected`);
        await prisma.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: false,
          },
        });
        break;

      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    ).headers.set("Allow", "POST");
  }
};

export { webhookHandler as POST };
