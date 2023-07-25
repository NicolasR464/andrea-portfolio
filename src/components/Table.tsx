"use client";
import Link from "next/link";
import AddressBtn from "@/components/AddressBtn";
import { getCode, getName } from "country-list";
import { count } from "console";

export default function Table({ orders }: { orders: any }) {
  // const country =
  //             getName(order.customerDetails?.address.country) || undefined;
  return (
    <div className="overflow-x-auto max-h-[70vh]">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <td>invoice detail</td>
            <td>customer name</td>
            <td>email</td>
            <td>phone</td>
            <td>address</td>
            <td>amount total</td>
            <td>date</td>
            <td>shipping status</td>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.data.map((order: any, i: number) => {
              let country;

              try {
                country = getName(order.customerDetails?.address.country);
              } catch (err) {
                country = order.customerDetails?.address.country;
              }

              const address =
                order.customerDetails?.address.line1 +
                ", " +
                (order.customerDetails?.address.line2 != null
                  ? order.customerDetails?.address.line2 + ","
                  : "") +
                order.customerDetails?.address.postal_code +
                ", " +
                order.customerDetails?.address.city +
                ", " +
                (order.customerDetails?.address.state != null
                  ? order.customerDetails?.address.state + ", "
                  : "") +
                country;

              // date

              const dateObj = new Date(order.createdAt);
              const localDateStr = dateObj.toLocaleString("en-GB");

              return (
                <tr key={i}>
                  <th>{i}</th>
                  <td>
                    {order?.invoice?.url !== undefined ? (
                      <Link
                        target="_blank"
                        className="cursor-pointer link"
                        href={order?.invoice?.url}
                      >
                        Stripe invoice
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{order.customerDetails?.name}</td>
                  <td>{order.customerDetails?.email}</td>
                  <td>
                    {" "}
                    <span className="text-center">
                      {order.customerDetails?.phone
                        ? order.customerDetails?.phone
                        : "-"}
                    </span>
                  </td>
                  <td>
                    <AddressBtn address={address} />
                  </td>
                  <td>{order?.amountTotal}€</td>
                  <td>{localDateStr}</td>
                  <td>{order?.shipping_status}</td>

                  <th>{i}</th>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <td>invoice detail</td>
            <td>customer name</td>
            <td>email</td>
            <td>phone</td>
            <td>address</td>
            <td>amount total</td>
            <td>date</td>
            <td>shipping status</td>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
