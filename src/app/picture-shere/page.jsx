import React from "react";
import { CldImage } from "next-cloudinary";
import Img from "@/components/Img";
import File from "@/components/File";
import { getCollection } from "@/library/db";
import { ObjectId } from "mongodb";
import { getCldOgImageUrl } from "next-cloudinary";

async function getDoc(id) {
  const filesCollection = await getCollection("files");
  const result = await filesCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result;
}

export async function generateMetadata({ searchParams }) {
  // const doc = await getDoc(searchParams.search);
  const publicId = searchParams.search;
  const headline = "Hello";
  const body = "Dont know";
  console.log(`searchparames=${searchParams.search}`);
  //console.log(`doc=${doc.photo}`);
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
          secure_url: getCldOgImageUrl({
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

const PictureShere = async ({ searchParams }, props) => {
  console.log(`user=${searchParams.user}`);
  const doc = await getDoc(searchParams.user);
  console.log(searchParams.search);
  return (
    <div>
      <File file={doc} />
    </div>
  );
};

export default PictureShere;
