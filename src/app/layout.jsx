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

export async function generateMetadata({ params }) {
  const publicId = "uggwv3umugtghfbyusxi";
  const headline = "Hello";
  const body = "Dont know";

  return {
    openGraph: {
      images: [
        {
          url: getCldOgImageUrl({
            src: publicId,
            effects: [{ colorize: "100,co_black" }],
            overlays: [
              {
                width: 2400,
                height: 1254,
                publicId,
                crop: "fill",
                effects: [
                  {
                    opacity: 60,
                  },
                ],
              },
              {
                width: 1400,
                crop: "fit",
                text: {
                  alignment: "center",
                  color: "white",
                  fontFamily: "Source Sans Pro",
                  fontSize: 160,
                  fontWeight: "bold",
                  text: headline,
                },
                position: {
                  y: -100,
                },
              },
              {
                width: 1400,
                crop: "fit",
                text: {
                  alignment: "center",
                  color: "white",
                  fontFamily: "Source Sans Pro",
                  fontSize: 74,
                  text: body,
                },
                position: {
                  y: 100,
                },
              },
            ],
          }),
          width: 1200,
          height: 627,
          type: "image/jpeg",
        },
      ],
    },
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
