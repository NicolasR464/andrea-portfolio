import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function getInvoiceUrl(invoiceId: any) {
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);

    return invoice.hosted_invoice_url;
  } catch (err) {
    console.log(err);
  }
}

export async function getProductInfo(prodId: any) {
  try {
    const product = await stripe.products.retrieve(prodId);
    return product;
  } catch (err) {
    console.log(err);
  }
}
