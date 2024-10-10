"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { deleteFile } from "../../server/fileController";
import { useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
//import { usePathname } from "next/navigation";
import { CldOgImage } from "next-cloudinary";

export default function File(props) {
  //const currentPageUrl = window.location.href;
  //const shareUrl = usePathname();

  //const shareUrl = { imageSrc };

  if (!props.file.photo) {
    props.file.photo = "nttjuphavds5ncxj2ajf.jpg";
  }
  return (
    <div className="relative max-w-[650px] rounded-xl overflow-hidden mx-auto mb-7">
      <img src="/aspect-ratio.png" />

      <div className="absolute inset-0 bg-gray-200 grid">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>

      <CldImage
        className="absolute inset-0 mx-auto rounded-xl"
        crop={{ type: "pad", source: true }}
        fillBackground
        width="650"
        height="300"
        src={props.file.photo}
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
              text: `${props.file.line1}%0A${props.file.line2}%0A${props.file.line3}%0A`,
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
              text: `${props.file.line1}%0A${props.file.line2}%0A${props.file.line3}%0A`,
            },
          },
        ]}
      ></CldImage>

      {/* List of text */}
      {/* {props.file.line1}
      <br />
      {props.file.line2}
      <br />
      {props.file.line3}
      <br /> */}

      {/* Facebook share */}

      <div className="absolute bottom-2 right-2 gap-4 mx-4 flex flex-row">
        <div>
          <FacebookShareButton
            url={`https://pictureit.vercel.app/image-page/${props.file._id.toString()}`}
            quote={"Title or jo bhi aapko likhna ho"}
            hashtag={"#image and text"}
          >
            <FacebookIcon size={40} round={true} />
          </FacebookShareButton>
        </div>
        <Link
          className="bg-black/40 hover:bg-black/70 rounded-md p-1 text-white/60 hover:text-white/80"
          href={`/image-page/${props.file._id.toString()}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
            />
          </svg>
        </Link>
        <Link
          className="bg-black/40 hover:bg-black/70 rounded-md p-1 text-white/60 hover:text-white/80"
          href={`/edit-file/${props.file._id.toString()}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </Link>
        <form action={deleteFile}>
          <input
            name="id"
            type="hidden"
            defaultValue={props.file._id.toString()}
          ></input>
          <button className="bg-black/40 hover:bg-black/70 rounded-md p-1 text-white/60 hover:text-white/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
