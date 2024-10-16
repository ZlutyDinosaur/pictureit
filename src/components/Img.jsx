"use client";
import React from "react";
import { CldImage } from "next-cloudinary";
import { useSearchParams } from "next/navigation";
import { getCldImageUrl } from "next-cloudinary";

const Img = () => {
  const searchParams = useSearchParams();
  const pictureUrl = getCldImageUrl({
    src: searchParams.get("search"),
  });
  console.log(searchParams.get("search"));
  //console.log(searchParams.get("url"));
  console.log(`url: ${pictureUrl}`);
  return (
    <div>
      <CldImage
        className="absolute inset-0 mx-auto rounded-xl"
        crop={{ type: "pad", source: true }}
        fillBackground
        width="650"
        height="300"
        src={searchParams.get("search")} //{searchParams.get("search")}
        sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
        alt="Picture description"
        overlays={[
          {
            position: {
              x: 104,
              y: 154,
              angle: -10,
              gravity: "north_west",
            },
            text: {
              color: "black",
              fontFamily: "Source Sans Pro",
              fontSize: 48,
              fontWeight: "bold",
              text: "hello", //`${props.file.line1}%0A${props.file.line2}%0A${props.file.line3}%0A`,
            },
          },
          {
            position: {
              x: 100,
              y: 150,
              angle: -10,
              gravity: "north_west",
            },
            text: {
              color: "white",
              fontFamily: "Source Sans Pro",
              fontSize: 48,
              fontWeight: "bold",
              text: "hello", //`${props.file.line1}%0A${props.file.line2}%0A${props.file.line3}%0A`,
            },
          },
        ]}
      ></CldImage>
    </div>
  );
};

export default Img;
