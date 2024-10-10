"use client";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { usePathname } from "next/navigation";

const Social = () => {
  //const currentPageUrl = window.location.href;
  const shareUrl = usePathname();

  return (
    <div className="relative max-w-[650px] rounded-xl overflow-hidden mx-auto mb-7">
      <FacebookShareButton
        url="https://res.cloudinary.com/dooo0vxwg/image/upload/c_pad,w_1200,h_553/b_gen_fill,ar_1200:553,c_pad/l_text:Source%20Sans%20Pro_48_bold:snow%20drops%250Adrop%250Asnow%250A,co_black/fl_layer_apply,fl_no_overflow,x_104,y_154,a_-10,g_north_west/l_text:Source%20Sans%20Pro_48_bold:snow%20drops%250Adrop%250Asnow%250A,co_white/fl_layer_apply,fl_no_overflow,x_100,y_150,a_-10,g_north_west/c_limit,w_1200/f_auto/q_auto/v1727966471/nirkp6rldk7hqlle3uoh?_a=BAVAUaDW0"
        quote={"Title or jo bhi aapko likhna ho"}
        hashtag={"#image and text"}
      >
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
    </div>
  );
};

export default Social;
