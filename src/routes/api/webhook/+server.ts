import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { google } from 'googleapis';
import type { RequestHandler } from './$types';
import { programs } from '$lib/data/programs';

// Load Stripe
const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil'
});

// Setup Google service account auth
const auth = new google.auth.GoogleAuth({
  keyFile: './google-service-account.json',
  scopes: ['https://www.googleapis.com/auth/drive']
});

export const POST: RequestHandler = async ({ request }) => {
  const signature = request.headers.get('stripe-signature');
  const rawBody = await request.text();

  let event;
  console.log('Stripe Signature:', signature);
  console.log('Raw body:', rawBody);

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature!,
      import.meta.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error('❌ Stripe webhook signature verification failed:', err.message);
    return new Response('Webhook Error', { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const email =
      paymentIntent.receipt_email ||
      (paymentIntent.customer &&
        typeof paymentIntent.customer === 'object' &&
        'email' in paymentIntent.customer &&
        (paymentIntent.customer as Stripe.Customer).email) ||
      paymentIntent.metadata?.customer_email;

    if (!email) {
      console.warn('⚠️ No customer email found in payment intent.');
      return json({ received: true });
    }

    const slugs = (paymentIntent.metadata?.program_slugs || '')
      .split(',')
      .map((slug) => slug.trim())
      .filter(Boolean);

    const drive = google.drive({ version: 'v3', auth });

    for (const slug of slugs) {
      const program = programs.find((p) => p.slug === slug);

      if (!program?.sheetId) {
        console.warn(`⚠️ No sheet found for slug: ${slug}`);
        continue;
      }

      try {
        // 1. Make a copy of the original sheet
        const copyRes = await drive.files.copy({
          fileId: program.sheetId,
          requestBody: {
            name: `${program.title} - Copy for ${email}`
          }
        });

        const copiedFileId = copyRes.data.id;

        if (!copiedFileId) {
          throw new Error('No file ID returned for copied sheet.');
        }

        // 2. Share the copied sheet with the customer
        await drive.permissions.create({
          fileId: copiedFileId,
          requestBody: {
            type: 'user',
            role: 'writer',
            emailAddress: email
          }
        });

        console.log(`✅ Copied and shared "${program.title}" with ${email}`);
      } catch (err) {
        console.error(`❌ Failed to copy and share "${program.title}" with ${email}`, err);
      }
    }
  }

  return json({ received: true });
};
