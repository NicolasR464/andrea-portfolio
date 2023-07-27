"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function NavBarLinks({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const [isAdminSet, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdmin);
    console.log(isAdmin);
  }, [isAdmin]);

  return (
    <div className="navbar-end">
      <div className="tabs mr-3">
        <Link
          className={pathname == "/buy" ? "tab tab-active" : "tab"}
          href="/about"
        >
          About
        </Link>
        <Link
          className={pathname == "/buy" ? "tab tab-active" : "tab"}
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className={pathname == "/buy" ? "tab tab-active" : "tab"}
          href="/buy"
        >
          Buy
        </Link>
        {isAdminSet && (
          <Link
            className={
              pathname == "/a" ||
              pathname == "/a/orders" ||
              pathname == "/a/bio"
                ? "tab tab-active"
                : "tab"
            }
            href="/a"
          >
            Admin
          </Link>
        )}

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
