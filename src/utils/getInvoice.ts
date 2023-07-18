import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function getInvoiceUrl(invoiceId: any) {
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    console.log("🍕");
    console.log(invoice);
    console.log(typeof invoice.hosted_invoice_url);

    return invoice.hosted_invoice_url;
  } catch (err) {
    console.log(err);
  }
}
