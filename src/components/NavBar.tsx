import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./NavBarLinks";
import NavBurger from "./NavBurger";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";

export default async function NavBar({ params }: any) {
  const user = await currentUser();
  const isAdmin =
    user?.emailAddresses[0]?.emailAddress === process.env.HOST_EMAIL ||
    user?.emailAddresses[0]?.emailAddress === process.env.DEV_EMAIL;

  const headersList = headers();
  const userAgent = headersList.get("user-agent");
  let isMobileView = userAgent!.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  return (
    <div className="fixed w-full z-40">
      <div className="navbar backdrop-blur-md  flex justify-between">
        <div className="navbar-start z-40">
          <Link href="/">
            <Image
              src={process.env.LOGO_IMG!}
              width={100}
              height={100}
              alt="website logo"
            />
          </Link>
        </div>
        {isMobileView ? <NavBurger /> : <NavBarLinks isAdmin={isAdmin} />}
      </div>
    </div>
  );
}
