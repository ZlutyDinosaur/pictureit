import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/library/getUser";
import FileForm from "@/components/FileForm";

const CreateFile = async () => {
  const user = await getUserFromCookie();
  if (!user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="flex text-center text-2xl text-gray-600 mb-5">
        Create file
      </p>
      <FileForm action="create" />
    </div>
  );
};

export default CreateFile;
