"use client";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { usePathname } from "next/navigation";

const social = () => {
  //const currentPageUrl = window.location.href;
  //const shareUrl = usePathname();

  return (
    <div className="relative max-w-[650px] rounded-xl overflow-hidden mx-auto mb-7">
      <FacebookShareButton
        url={`https://pictureit.vercel.app/image-page/${props.file._id.toString()}`}
        quote={"Title or jo bhi aapko likhna ho"}
        hashtag={"#image and text"}
      >
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
    </div>
  );
};

export default social;
