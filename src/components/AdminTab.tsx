"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminTab() {
  const pathname = usePathname();

  // tab tab-bordered tab-active
  return (
    <div className="flex w-screen justify-center">
      <div className="tabs ">
        <Link
          href="/a"
          className={
            pathname == "/a"
              ? "tab tab-bordered tab-active"
              : "tab tab-bordered"
          }
        >
          drawings
        </Link>
        <Link
          href="/a/bio"
          className={
            pathname == "/a/bio"
              ? "tab tab-bordered tab-active"
              : "tab tab-bordered"
          }
        >
          bio
        </Link>
        <Link
          href="/a/orders"
          className={
            pathname == "/a/orders"
              ? "tab tab-bordered tab-active"
              : "tab tab-bordered"
          }
        >
          orders
        </Link>
      </div>
    </div>
  );
}
