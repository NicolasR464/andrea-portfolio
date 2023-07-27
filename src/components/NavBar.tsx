import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./NavBarLinks";
import { currentUser } from "@clerk/nextjs";

export default async function NavBar({ params }: any) {
  const user = await currentUser();
  const isAdmin =
    user?.emailAddresses[0].emailAddress === process.env.HOST_EMAIL;

  // const user = undefined;
  // const isAdmin = false;

  return (
    <div className="fixed w-full z-40">
      <div className="navbar backdrop-blur-md">
        <div className="navbar-start">
          <Link href="/">
            <Image
              src={process.env.LOGO_IMG!}
              width={100}
              height={100}
              alt="website logo"
            />
          </Link>
        </div>
        <NavBarLinks isAdmin={isAdmin} />
      </div>
    </div>
  );
}
