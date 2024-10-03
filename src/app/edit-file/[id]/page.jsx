import { getCollection } from "@/library/db";
import Image from "next/image";
import FileForm from "@/components/FileForm";
import File from "@/components/File";
import { ObjectId } from "mongodb";
import { getUserFromCookie } from "@/library/getUser";
import { redirect } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { getCldImageUrl } from "next-cloudinary";

async function getDoc(id) {
  const filesCollection = await getCollection("files");
  const result = await filesCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  return result;
}

const EditFile = async (props) => {
  const doc = await getDoc(props.params.id);
  const user = await getUserFromCookie();

  if (user.userId !== doc.author.toString()) {
    console.log(doc.author);
    return redirect("/");
  }

  return (
    <div>
      <h2 className="text-center text-2xl">Edit file</h2>
      <FileForm file={doc} action="edit" />
      <div className="w-80 max-w-[650px] rounded-md mx-auto mt-4">
        <File file={doc} />
        <Image className="rounded-md" src={doc.photo} width={600} height={80} />
      </div>
      <div></div>
    </div>
  );
};

export default EditFile;
