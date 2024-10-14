import { getCollection } from "@/library/db";
import FileForm from "@/components/FileForm";
import File from "@/components/File";
import { ObjectId } from "mongodb";
import { getUserFromCookie } from "@/library/getUser";
import { redirect } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { getCldOgImageUrl } from "next-cloudinary";

async function getDoc(id) {
  const filesCollection = await getCollection("files");
  const result = await filesCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result;
}

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
        },
      ],
    },
  };
}

// export async function generateMetadata({ params, searchParams }) {
//   return {
//     openGraph: {
//       images: [
//         {
//           url: getCldOgImageUrl({
//             src: "uggwv3umugtghfbyusxi",
//           }),
//           secure_url: getCldOgImageUrl({
//             src: "uggwv3umugtghfbyusxi",
//           }),
//           secure: getCldOgImageUrl({
//             src: "uggwv3umugtghfbyusxi",
//           }),
//           width: 1200,
//           height: 627,
//           type: "image/jpeg",
//           overlays: [
//             {
//               text: "Hello",
//             },
//           ],
//         },
//       ],
//     },
//     title: "Picture page",
//     description: "Picture page",
//   };
// }

// export async function generateMetadata({ params }) {
//   const id = params.id;
//   const filesCollection = await getCollection("files");
//   const result = await filesCollection.findOne({
//     _id: ObjectId.createFromHexString(id),
//   });
//   console.log(result.photo_id);
//   console.log(id);
//   return {
//     openGraph: {
//       images: [
//         {
//           url: getCldOgImageUrl({
//             src: result.photo_id,
//           }),
//           secure_url: getCldOgImageUrl({
//             src: result.photo_id,
//           }),
//           width: 1200,
//           height: 627,
//         },
//       ],
//     },
//     title: "Picture page",
//     description: "Picture page",
//   };
// }

const ImagePage = async (props) => {
  const doc = await getDoc(props.params.id);
  const user = await getUserFromCookie();

  if (user.userId !== doc.author.toString()) {
    console.log(doc.author);
    console.log(doc.photo);
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
