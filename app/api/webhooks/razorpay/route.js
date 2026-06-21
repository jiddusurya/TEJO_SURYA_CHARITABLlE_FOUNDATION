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
<div style="margin:0; padding:0; background-color:#f8fafc; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f8fafc; padding:30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#b45309,#f59e0b); padding:35px 25px;">
              <img
                src="https://res.cloudinary.com/dqwcr4y98/image/upload/v1782041922/logo_gdodpu.png"
                alt="Tejo Surya Charitable Foundation"
                width="90"
                style="display:block; margin-bottom:15px;"
              />

              <h1 style="margin:0; color:#ffffff; font-size:28px; font-weight:700;">
                Donation Received
              </h1>

              <p style="margin:10px 0 0; color:#fde68a; font-size:15px;">
                Thank you for making a difference
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 35px;">
              <p style="margin:0 0 20px; font-size:16px; color:#374151;">
                Dear <strong>${donorName}</strong>,
              </p>

              <p style="margin:0 0 20px; font-size:16px; color:#4b5563; line-height:1.7;">
                Thank you for supporting
                <strong>Tejo Surya Charitable Foundation</strong>.
                Your donation has been successfully received and processed.
              </p>

              <!-- Donation Details -->
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="background:#fffbeb; border:1px solid #fde68a; border-radius:12px;"
              >
                <tr>
                  <td style="padding:24px;">
                    <h3 style="margin:0 0 18px; color:#92400e; font-size:18px;">
                      Donation Details
                    </h3>

                    <table width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:8px 0; color:#6b7280;">
                          <strong>Amount</strong>
                        </td>
                        <td align="right" style="padding:8px 0; color:#111827;">
                          ${amountText}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:8px 0; color:#6b7280;">
                          <strong>Payment ID</strong>
                        </td>
                        <td align="right" style="padding:8px 0; color:#111827;">
                          ${paymentId}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:8px 0; color:#6b7280;">
                          <strong>Donation Type</strong>
                        </td>
                        <td align="right" style="padding:8px 0; color:#111827;">
                          ${donationType}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding:8px 0; color:#6b7280;">
                          <strong>WhatsApp</strong>
                        </td>
                        <td align="right" style="padding:8px 0; color:#111827;">
                          ${whatsapp}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:28px 0 0; font-size:16px; color:#4b5563; line-height:1.7;">
                Your contribution helps us empower girls through menstrual
                health awareness, education, and access to essential hygiene
                resources. Together, we are creating a future with dignity,
                confidence, and opportunity for every girl.
              </p>

              <p style="margin:30px 0 0; color:#374151; line-height:1.8;">
                With sincere gratitude,<br>
                <strong>Tejo Surya Charitable Foundation</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:25px; text-align:center; border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 10px; color:#6b7280; font-size:14px;">
                Tejo Surya Charitable Foundation
              </p>

              <p style="margin:0 0 10px; font-size:14px;">
                <a
                  href="https://tejosuryafoundation.org"
                  style="color:#b45309; text-decoration:none; font-weight:600;"
                >
                  www.tejosuryafoundation.org
                </a>
              </p>

              <p style="margin:0; color:#9ca3af; font-size:12px;">
                Thank you for your generosity and support.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
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
