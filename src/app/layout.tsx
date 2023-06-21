import "./globals.css";
import { Inter, Roboto_Mono, Tilt_Prism, Tenor_Sans } from "next/font/google";
import Script from "next/script";
import NavBar from "../components/NavBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto_mono",
});

const tilt_prism = Tilt_Prism({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-tilt_prism",
});

const tenor_sans = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-tenor_sans",
});

export const metadata = {
  title: "Andréa Rocagel | Drawing Portfolio",
  description: "Discover and purchase Andréa Rocagel's art",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      data-theme="cupcake"
      className={`${tenor_sans.variable} ${tilt_prism.variable}`}
      lang="en"
    >
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
      <Script src="./custom.js" />
    </html>
  );
}
