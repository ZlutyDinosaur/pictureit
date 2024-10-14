import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { CldOgImage } from "next-cloudinary";
import { getCldOgImageUrl } from "next-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { getCldImageUrl } from "next-cloudinary";

// export const metadata = {
//   title: "Layout page",
//   description: "Layout page",
// };

export async function generateMetadata({ params, searchParams }) {
  return {
    openGraph: {
      images: [
        {
          url: getCldOgImageUrl({
            src: "zr44enbpjlnltbmmiosm",
          }),
          secure_url: getCldOgImageUrl({
            src: "zr44enbpjlnltbmmiosm",
          }),
          secure: getCldOgImageUrl({
            src: "zr44enbpjlnltbmmiosm",
          }),
          width: 1200,
          height: 627,
          type: "image/jpeg",
        },
      ],
    },
    title: "Home page",
    description: "Home page",
  };
}

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

// export const metadata = {
//   openGraph: {
//     images: [
//       {
//         url: getCldOgImageUrl({
//           src: "/lxsmurmmyhzj5ztw3ioq",
//         }),
//         secure_url: getCldOgImageUrl({
//           src: "/lxsmurmmyhzj5ztw3ioq",
//         }),
//         width: 1200,
//         height: 627,
//       },
//     ],
//   },
//   title: "Picture it",
//   description: "Pictue & text",
// };

export default async function RootLayout({ children }) {
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
