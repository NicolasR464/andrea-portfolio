"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useStore } from "@/store";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBarLinks({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const [isAdminSet, setIsAdmin] = useState(false);
  const { bag, isOpen } = useStore();

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
        {bag.length > 0 && (
          <button
            onClick={() => {
              useStore.setState({ isOpen: true });
            }}
            className="-translate-y-[4px] ml-1"
          >
            {" "}
            {/* <FontAwesomeIcon width="24" icon={faBagShopping} /> */}
            <Image
              src="/shop2.png"
              width={30}
              height={30}
              alt="Shopping bag"
            ></Image>
          </button>
        )}
        <Link className="ml-[16px] -translate-y-[5.6px]" href="/contact">
          <Image
            src={pathname == "/contact" ? "/mail.png" : "/mail2.png"}
            width={25}
            height={25}
            alt="Contact"
          />
        </Link>
        <Link
          className="ml-[20px] -translate-y-[6px]"
          target="blank"
          href="https://www.instagram.com/andreagracerocagel"
        >
          <Image
            src="/insta2.png"
            width={25}
            height={25}
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
