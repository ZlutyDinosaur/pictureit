import { Metadata } from "next";
import Page from "./page"; // import your Demo's page

export async function generateMetadata({ params, searchParams }) {
  return {
    openGraph: {
      images: [
        {
          url: getCldOgImageUrl({
            src: "uggwv3umugtghfbyusxi",
          }),
          secure_url: getCldOgImageUrl({
            src: "uggwv3umugtghfbyusxi",
          }),
          secure: getCldOgImageUrl({
            src: "uggwv3umugtghfbyusxi",
          }),
          width: 1200,
          height: 627,
          type: "image/jpeg",
        },
      ],
    },
    title: "Picture page",
    description: "Picture page",
  };
}
export default function PageLayout() {
  return <Page />;
}
