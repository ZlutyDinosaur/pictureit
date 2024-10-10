"use client";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { usePathname } from "next/navigation";
import { getCldOgImageUrl } from "next-cloudinary";

const publicId = "/srphfilqomhlgbr6fbhv";
const headline = "Black crow";
const body = "This is black crow";

export const metadata = {
  openGraph: {
    images: [
      {
        // Prefer a different size? Be sure to update the width and height of the
        // metadata as well as the image configuration of getCldOgImageUrl
        width: 1200,
        height: 630,
        url: getCldOgImageUrl({
          src: publicId,
          effects: [{ colorize: "100,co_black" }],
          overlays: [
            {
              publicId,
              width: 1200,
              height: 630,
              crop: "fill",
              effects: [
                {
                  opacity: 60,
                },
              ],
            },
            {
              width: 700,
              crop: "fit",
              text: {
                alignment: "center",
                color: "white",
                fontFamily: "Source Sans Pro",
                fontSize: 80,
                fontWeight: "bold",
                text: headline,
              },
              position: {
                y: -50,
              },
            },
            {
              width: 700,
              crop: "fit",
              text: {
                alignment: "center",
                color: "white",
                fontFamily: "Source Sans Pro",
                fontSize: 37,
                text: body,
              },
              position: {
                y: 50,
              },
            },
          ],
        }),
      },
    ],
  },
};

const Social = () => {
  //const currentPageUrl = window.location.href;
  const shareUrl = usePathname();

  return (
    <div className="relative max-w-[650px] rounded-xl overflow-hidden mx-auto mb-7">
      <FacebookShareButton url={publicId}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
    </div>
  );
};

export default Social;
