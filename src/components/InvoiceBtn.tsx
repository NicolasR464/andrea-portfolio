"use client";
import { useClipboard } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function InvoiceBtn({
  stripeL,
  orders,
}: {
  stripeL: any;
  orders: any;
}) {
  const [stripeLink, setStripeLink] = useState();

  useEffect(() => {
    setStripeLink(stripeL);
  }, [stripeL]);

  return (
    <div className="tooltip" data-tip={}>
      <Link href={stripeLink} className="link">
        Stripe invoice
      </Link>
    </div>
  );
}
