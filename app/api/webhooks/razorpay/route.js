import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '../../../../lib/prisma';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const foundationEmail = 'tejosuryafoundation@gmail.com';
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

function verifySignature(body, signature) {
  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
}

function formatAmount(amount, currency) {
  const value = Number(amount || 0) / 100;
  if (currency === 'INR') {
    return `₹${value.toLocaleString('en-IN')}`;
  }
  return `${currency} ${value.toLocaleString('en-US')}`;
}

function buildEmailHtml(payment) {
  const donorName = payment.name || 'Supporter';
  const amountText = formatAmount(payment.amount, payment.currency);
  const paymentId = payment.razorpayPaymentId || 'Pending';
  const whatsapp = payment.whatsapp || 'Not provided';
  const donationType = payment.donationType || 'one-time';

  return `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
      <h2 style="color: #b45309; margin-bottom: 16px;">Payment Successful</h2>
      <p>Dear ${donorName},</p>
      <p>Thank you for supporting Tejo Surya Charitable Foundation. Your donation has been captured successfully.</p>
      <div style="background:#f9fafb; padding:16px; border-radius:12px; margin:20px 0; border:1px solid #e5e7eb;">
        <p style="margin: 0 0 8px 0;"><strong>Amount:</strong> ${amountText}</p>
        <p style="margin: 0 0 8px 0;"><strong>Payment ID:</strong> ${paymentId}</p>
        <p style="margin: 0 0 8px 0;"><strong>Donation Type:</strong> ${donationType}</p>
        <p style="margin: 0;"><strong>WhatsApp:</strong> ${whatsapp}</p>
      </div>
      <p>Your contribution helps us support girls with menstrual health education and dignity.</p>
      <p>With gratitude,<br />Tejo Surya Charitable Foundation</p>
    </div>
  `;
}

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('x-razorpay-signature') || '';

  if (!verifySignature(body, signature)) {
    return new NextResponse('Invalid signature', { status: 400 });
  }

  if (!resend) {
    return new NextResponse('Resend not configured', { status: 500 });
  }

  try {
    const event = JSON.parse(body);

    if (event.event !== 'payment.captured') {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const payment = event.payload?.payment?.entity;

    if (!payment) {
      return new NextResponse('Missing payment payload', { status: 400 });
    }

    const notes = payment.notes || {};
    const email = notes.donor_email || payment.email || null;
    const name = notes.donor_name || payment.name || null;
    const whatsapp = notes.donor_whatsapp || null;
    const donationType = notes.donation_type || null;

    const storedPayment = await prisma.payment.upsert({
      where: { razorpayOrderId: payment.order_id },
      update: {
        razorpayPaymentId: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status || 'captured',
        name,
        email,
        whatsapp,
        donationType,
      },
      create: {
        razorpayOrderId: payment.order_id,
        razorpayPaymentId: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status || 'captured',
        name,
        email,
        whatsapp,
        donationType,
      },
    });

    if (!storedPayment.emailSent) {
      const to = [foundationEmail, email].filter(Boolean);

      await resend.emails.send({
        from: fromEmail,
        to,
        subject: 'Payment Successful - Tejo Surya Charitable Foundation',
        html: buildEmailHtml(storedPayment),
      });

      await prisma.payment.update({
        where: { id: storedPayment.id },
        data: { emailSent: true },
      });
    }
    console.log('RAZORPAY_WEBHOOK_SUCCESS', { paymentId: payment.id, emailSent: !storedPayment.emailSent });
    console.log('Payment details:', {
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      email,
      name,
      whatsapp,
      donationType,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('RAZORPAY_WEBHOOK_ERROR', error);
    return new NextResponse('Webhook processing failed', { status: 500 });
  }
}
