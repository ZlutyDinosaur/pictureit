import { getCollection } from "@/library/db";
import FileForm from "@/components/FileForm";
import File from "@/components/File";
import { ObjectId } from "mongodb";
import { getUserFromCookie } from "@/library/getUser";
import { redirect } from "next/navigation";
import { CldImage } from "next-cloudinary";
//import Social from "@/components/Social";

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
