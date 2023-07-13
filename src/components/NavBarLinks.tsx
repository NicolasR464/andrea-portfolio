"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, useSession } from "@clerk/clerk-react";
import { useEffect } from "react";

// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const MyComponent = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const handleRouteChange = () => {
//       const script = document.createElement('script');
//       script.src = "/path/to/your/script.js";
//       script.async = true;
//       document.body.appendChild(script);
//     };

//     router.events.on('routeChangeComplete', handleRouteChange);

//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChange);
//     };
//   }, [router.events]);

//   return <div>My Component</div>;
// };

// export default MyComponent;

export default function NavBarLinks() {
  const pathname = usePathname();
  const { isLoaded, session } = useSession();

  useEffect(() => {
    if (isLoaded) {
      console.log(session);
    }

    console.log(session);
  }, [session]);

  return (
    <div className="navbar-end">
      <div className="tabs mr-3">
        <Link
          className={pathname == "/buy" ? "tab tab-active" : "tab"}
          href="/buy"
        >
          Buy
        </Link>
        <Link className={pathname == "/a" ? "tab tab-active" : "tab"} href="/a">
          Admin
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
