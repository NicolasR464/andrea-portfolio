"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";

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
          className={pathname == "/about" ? "tab tab-active" : "tab"}
          href="/about"
        >
          About
        </Link>
        <Link
          className={pathname == "/buy" ? "tab tab-active" : "tab"}
          href="/buy"
        >
          Buy
        </Link>
        <Link className="ml-2" href="/contact">
          <Image src="/mail-icon.png" width={40} height={40} alt="Contact" />
        </Link>
        <Link
          className="ml-3 translate-y-[2px]"
          target="blank"
          href="https://www.instagram.com/andreagracerocagel"
        >
          <Image
            src="/insta-icon.png"
            width={40}
            height={40}
            alt="Instagram link"
          />
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
