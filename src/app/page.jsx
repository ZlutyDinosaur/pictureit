import RegisterForm from "@/components/RegisterForm";
import { getUserFromCookie } from "@/library/getUser";
import Dashboard from "@/components/Dashboard";
import { CldOgImage } from "next-cloudinary";
import { getCldOgImageUrl } from "next-cloudinary";
import { Metadata } from "next";

const publicId = "images/mountain";
const headline = "Next Cloudinary";
const body =
  "Get the power of Cloudinary in a Next.js project with Next Cloudinary!";

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

async function Home() {
  const user = await getUserFromCookie();
  return (
    <div>
      <CldOgImage src="srphfilqomhlgbr6fbhv" />
      {user && <Dashboard user={user} />}
      {!user && (
        <div className="flex flex-col items-center justify-center">
          <p className="flex text-center text-2xl text-gray-600 mb-5">
            Dont&rsquo;t have an account?
            <span className="text-red-700 font-bold pl-2">Create One</span>
          </p>
          <RegisterForm />
        </div>
      )}
    </div>
  );
}

export default Home;
