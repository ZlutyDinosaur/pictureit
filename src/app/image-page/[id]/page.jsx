import { getCollection } from "@/library/db";
import FileForm from "@/components/FileForm";
import File from "@/components/File";
import { ObjectId } from "mongodb";
import { getUserFromCookie } from "@/library/getUser";
import { redirect } from "next/navigation";
import { CldImage } from "next-cloudinary";
//import Social from "@/components/Social";
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

async function getDoc(id) {
  const filesCollection = await getCollection("files");
  const result = await filesCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result;
}

const ImagePage = async (props) => {
  const doc = await getDoc(props.params.id);
  const user = await getUserFromCookie();

  if (user.userId !== doc.author.toString()) {
    console.log(doc.author);
    return redirect("/");
  }
  return (
    <div>
      <div class>
        <File file={doc} />
      </div>
    </div>
  );
};

export default ImagePage;
