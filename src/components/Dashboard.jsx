import { ObjectId } from "mongodb";
import { getCollection } from "@/library/db";
import File from "./File";

async function getFiles(id) {
  //console.log(id);
  const collection = await getCollection("files");
  const results = await collection
    .find({ author: ObjectId.createFromHexString(id) })
    .sort({ _id: -1 })
    .toArray();
  //console.log(results);
  return results;
}

async function getUserName(id) {
  //console.log(id);
  const collection = await getCollection("users");
  const results = await collection.findOne({
    _id: ObjectId.createFromHexString(id),
  });
  //console.log(results.username);
  return results;
}

const Dashboard = async (props) => {
  const files = await getFiles(props.user.userId);
  const user = await getUserName(props.user.userId);
  return (
    <div>
      <h2 className="text-center text-2xl text-gray-600 mb-5">
        <span className="mx-2">{user.username.toString()}</span>
        Files
      </h2>
      {files.map((file, index) => {
        file._id = file._id.toString();
        file.author = file.author.toString();
        return <File file={file} key={index} />;
      })}
    </div>
  );
};

export default Dashboard;
