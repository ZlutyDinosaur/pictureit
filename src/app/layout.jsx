import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { CldOgImage } from "next-cloudinary";
import { getCldOgImageUrl } from "next-cloudinary";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  openGraph: {
    images: [
      {
        url: getCldOgImageUrl({
          src: "/srphfilqomhlgbr6fbhv",
        }),
        secure_url: getCldOgImageUrl({
          src: "/srphfilqomhlgbr6fbhv",
        }),
        width: 1200,
        height: 627,
      },
    ],
  },
  title: "Picture it",
  description: "Pictue & text",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      {/* <CldOgImage src="/srphfilqomhlgbr6fbhv" /> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="flex flex-col mx-auto pt-11 bg-white h-[calc(100vh-24vh)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
