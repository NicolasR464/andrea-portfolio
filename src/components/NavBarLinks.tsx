"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBarLinks() {
  const pathname = usePathname();
  return (
    <div className="navbar-end">
      <div className="tabs">
        <Link
          className={pathname == "/buy" ? "tab tab-active" : "tab"}
          href="/buy"
        >
          Buy
        </Link>
        <Link className={pathname == "/a" ? "tab tab-active" : "tab"} href="/a">
          Admin
        </Link>
      </div>
    </div>
  );
}
