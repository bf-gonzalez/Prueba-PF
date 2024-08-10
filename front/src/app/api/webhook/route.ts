import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51PiMFr2K8akoQqIvjArZrVIvHRopS1FPhmswV0QQsiRtBWr8IBH94SQ4KeoIggm5UJm8fzCKNuN57sHsxLlVTEHQ00Was5x0Vv", {
  apiVersion: "2024-06-20",
});
const endpointSecret = "whsec_sMemg80peAlDlaN7bzUsI94Al78sWBMn";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") || "";
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutComplete = event.data.object as Stripe.Checkout.Session;

      const membershipData = {
        email: checkoutComplete.customer_details?.email || "",
        type: (checkoutComplete.metadata && checkoutComplete.metadata.typeProduct) || "unknown",
        price: checkoutComplete.amount_total || 0,
        created_at: new Date(checkoutComplete.created * 1000).toISOString(),
        payment_date: new Date().toISOString(),
      };

     
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/membership`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(membershipData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
