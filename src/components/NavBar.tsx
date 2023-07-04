import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed w-full z-50">
      <div className="navbar backdrop-blur-md">
        <div className="navbar-start">
          <div className="dropdown">
            <Link href="/">
              <Image
                src="https://res.cloudinary.com/niikkoo/image/upload/v1687358552/andrea-drawing-portfolio/assets-misc/logo_nmaq4a.png"
                width={100}
                height={100}
                alt="website logo"
              />
            </Link>
          </div>
        </div>
        <div className="navbar-end">
          <Link href="/a">
            <button className="btn">admin</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
