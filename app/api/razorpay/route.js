// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(request) {
//   try {
//     // The 'currency' is now passed from the frontend.
//     const { amount, currency, type } = await request.json();

//     // Validate that currency is provided.
//     if (!currency) {
//         return new NextResponse("Currency is required", { status: 400 });
//     }

//     // --- Logic for Monthly Recurring Donations ---
//     if (type === 'monthly') {
//       // **FIX**: Add server-side validation. Razorpay subscriptions for Indian
//       // accounts typically only support INR. This prevents the API call from failing.
//       if (currency !== 'INR') {
//         return new NextResponse("Monthly donations are only supported in INR.", { status: 400 });
//       }

//       const plan = await razorpay.plans.create({
//         period: "monthly",
//         interval: 1,
//         item: {
//           name: "Monthly Donation Plan",
//           amount: amount * 100, // Amount in smallest currency unit (e.g., paise or cents)
//           currency: currency,
//           description: "Monthly contribution for a good cause.",
//         },
//       });

//       const subscription = await razorpay.subscriptions.create({
//         plan_id: plan.id,
//         customer_notify: 1,
//         quantity: 1,
//         total_count: 12, // e.g., for 1 year
//       });

//       return NextResponse.json({ subscription_id: subscription.id, amount: plan.item.amount, currency: plan.item.currency });
//     }

//     // --- Logic for One-Time Donations (existing logic) ---
//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: `receipt_order_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     if (!order) {
//       return new NextResponse("Order creation failed", { status: 500 });
//     }

//     return NextResponse.json(order);

//   } catch (error) {
//     console.error("RAZORPAY_API_ERROR", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Add validation for environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("Missing Razorpay environment variables");
}

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET 
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

export async function POST(request) {
  try {
    // Check if Razorpay is properly initialized
    if (!razorpay) {
      console.error("Razorpay not initialized - missing API keys");
      return new NextResponse("Payment service not configured", { status: 500 });
    }

    // The 'currency' is now passed from the frontend.
    const { amount, currency, type } = await request.json();

    // Validate that currency is provided.
    if (!currency) {
        return new NextResponse("Currency is required", { status: 400 });
    }

    // --- Logic for Monthly Recurring Donations ---
    if (type === 'monthly') {
      // **FIX**: Add server-side validation. Razorpay subscriptions for Indian
      // accounts typically only support INR. This prevents the API call from failing.
      if (currency !== 'INR') {
        return new NextResponse("Monthly donations are only supported in INR.", { status: 400 });
      }

      const plan = await razorpay.plans.create({
        period: "monthly",
        interval: 1,
        item: {
          name: "Monthly Donation Plan",
          amount: amount * 100, // Amount in smallest currency unit (e.g., paise or cents)
          currency: currency,
          description: "Monthly contribution for a good cause.",
        },
      });

      const subscription = await razorpay.subscriptions.create({
        plan_id: plan.id,
        customer_notify: 1,
        quantity: 1,
        total_count: 12, // e.g., for 1 year
      });

      return NextResponse.json({ subscription_id: subscription.id, amount: plan.item.amount, currency: plan.item.currency });
    }

    // --- Logic for One-Time Donations (existing logic) ---
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return new NextResponse("Order creation failed", { status: 500 });
    }

    return NextResponse.json(order);

  } catch (error) {
    console.error("RAZORPAY_API_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}