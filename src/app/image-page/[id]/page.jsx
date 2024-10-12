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
  const id = params.id;
  const filesCollection = await getCollection("files");
  const result = await filesCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  console.log(result.photo_id);
  console.log(id);
  return {
    openGraph: {
      images: [
        {
          url: getCldOgImageUrl({
            src: result.photo_id,
          }),
          secure_url: getCldOgImageUrl({
            src: result.photo_id,
          }),
          width: 1200,
          height: 627,
        },
      ],
    },
    title: "Picture page",
    description: "Picture page",
  };
}

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
