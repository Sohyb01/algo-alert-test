import Stripe from "stripe";
import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`);

  const webhookSecret: string = `${process.env.STRIPE_SECRET_KEY!}`;

  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      const body = await buffer(req);
      event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err}`);
      res.status(400).send(`Webhook Error: ${err}`);
      return;
    }

    // Successfully constructed event
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
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    req.on("error", reject);
  });
};

export { handler as POST };
