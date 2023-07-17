import Link from "next/link";

export default function Table({ orders }: { orders: any }) {
  console.log("🍕🍕");

  console.log(orders);

  return (
    <div className="overflow-x-auto max-h-screen">
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
          {orders.data.map((order: any, i: number) => {
            return (
              <tr key={i}>
                <th>{i}</th>
                <td>
                  <Link className="cursor-pointer" href="/a">
                    {order.invoiceId}
                  </Link>{" "}
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
                  <div
                    className="tooltip"
                    data-tip={
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
                      order.customerDetails?.address.country
                    }
                  >
                    <button className="btn btn-outline btn-xs">show</button>
                  </div>
                </td>
                <td>{order?.amountTotal}€</td>
                <td>{order?.createdAt?.split("GMT")[0]}</td>
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
