import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { geUserPlanItemId, getUserPlanPriceId } from "@/app/lib/functions";
import { yearlySubscriptionPriceId } from "@/app/lib/displaydata";

export async function GET(req: NextRequest) {
  const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY!}`, {
    apiVersion: "2023-10-16",
  });

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message: "You are not signed in.",
        },
      },
      { status: 401 }
    );
  }
  if (!session?.user.isActive) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message: "You do not have a plan to upgrade.",
        },
      },
      { status: 401 }
    );
  }

  // First, retrieve the subscriptions of the current customer

  // We get the subscriptionId ( we already have it in the server session)
  // the subscription item Id:
  const itemId = await geUserPlanItemId();
  console.log(`item id: ${itemId}`);
  // the subscription plan Id:
  const priceId = await getUserPlanPriceId();
  console.log(`price id: ${priceId}`);

  console.log(`session user subscriptionID: ${session.user.subscriptionID}`);

  if (priceId === yearlySubscriptionPriceId) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message:
            "You are already on the yearly plan and cannot upgrade further",
        },
      },
      { status: 401 }
    );
  }
  try {
    const updatedSubscription = await stripe.subscriptions.update(
      `${session.user.subscriptionID}`,
      {
        items: [
          {
            id: `${itemId}`,
            price: `${yearlySubscriptionPriceId}`,
          },
        ],
      }
    );
    return NextResponse.json({ updatedSubscription }, { status: 200 });
  } catch (error) {
    console.log("error: ", error);
  }
}
