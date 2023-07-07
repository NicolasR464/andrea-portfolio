import Image from "next/image";
import Link from "next/link";
import NavBarLinks from "./NavBarLinks";

export default function NavBar({ params }: any) {
  return (
    <div className="fixed w-full z-40">
      <div className="navbar backdrop-blur-md">
        <div className="navbar-start">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/niikkoo/image/upload/v1687358552/andrea-drawing-portfolio/assets-misc/logo_nmaq4a.png"
              width={100}
              height={100}
              alt="website logo"
            />
          </Link>
        </div>
        <NavBarLinks />
      </div>
    </div>
  );
}
