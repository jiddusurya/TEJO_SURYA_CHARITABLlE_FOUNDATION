import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay instance with your keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    // Get the amount from the request body
    const { amount, currency = "INR" } = await request.json();

    // Create Razorpay order options
    const options = {
      amount: amount * 100, // amount in the smallest currency unit (e.g., paise)
      currency,
      receipt: `receipt_order_${Date.now()}`, // a unique receipt ID
    };

    // Create the order
    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json(
        { error: "Order creation failed" },
        { status: 500 }
      );
    }

    // Return the order details to the frontend
    return NextResponse.json(order, { status: 200 });

  } catch (error) {
    console.error("Razorpay API Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}