"use server";
import { redirect } from "next/navigation";
import { getUserFromCookie } from "@/library/getUser";
import { ObjectId } from "mongodb";
import { getCollection } from "@/library/db";
import cloudinary from "cloudinary";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isLetterOrNumber(text) {
  const regex = /^[a-zA-Z0-9 .,]*$/;
  return regex.test(text);
}

async function sharedFileLogic(formData, user) {
  //console.log(formData.get("signature"));
  console.log(formData.get("public_id"));
  //console.log(formData.get("version"));
  console.log(formData.get("url"));

  const errors = {};

  const ourFile = {
    line1: formData.get("line1"),
    line2: formData.get("line2"),
    line3: formData.get("line3"),
    author: ObjectId.createFromHexString(user.userId),
  };

  if (typeof ourFile.line1 != "string") ourFile.line1 = "";
  if (typeof ourFile.line2 != "string") ourFile.line2 = "";
  if (typeof ourFile.line3 != "string") ourFile.line3 = "";

  ourFile.line1 = ourFile.line1.replace(/(\r\n|\n|\r)/g, " ");
  ourFile.line2 = ourFile.line2.replace(/(\r\n|\n|\r)/g, " ");
  ourFile.line3 = ourFile.line3.replace(/(\r\n|\n|\r)/g, " ");

  ourFile.line1 = ourFile.line1.trim();
  ourFile.line2 = ourFile.line2.trim();
  ourFile.line3 = ourFile.line3.trim();

  if (!isLetterOrNumber(ourFile.line1))
    errors.line1 = "Only letters or numbers can be used";
  if (!isLetterOrNumber(ourFile.line2))
    errors.line2 = "Only letters or numbers can be used";
  if (!isLetterOrNumber(ourFile.line3))
    errors.line3 = "Only letters or numbers can be used";

  if (ourFile.line1.length == 0) errors.line1 = "This field is required.";
  if (ourFile.line2.length == 0) errors.line2 = "This field is required.";
  if (ourFile.line3.length == 0) errors.line3 = "This field is required.";

  //Verify signature
  const expectedSignature = cloudinary.utils.api_sign_request(
    {
      public_id: formData.get("public_id"),
      version: formData.get("version"),
    },
    cloudinaryConfig.api_secret
  );

  if (expectedSignature === formData.get("signature")) {
    ourFile.photo = formData.get("url"); //
    ourFile.photo_id = formData.get("public_id");
  }

  return {
    errors: errors,
    ourFile: ourFile,
  };
}

export const createFile = async function (prevState, formData) {
  const user = await getUserFromCookie();

  if (!user) {
    return redirect("/");
  }

  const results = await sharedFileLogic(formData, user);

  if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
    return { errors: results.errors };
  }

  // save in db
  const fileCollection = await getCollection("files");
  const newFile = await fileCollection.insertOne(results.ourFile);
  return redirect("/");
};

export const deleteFile = async function (formData) {
  const user = await getUserFromCookie();

  if (!user) {
    return redirect("/");
  }

  const fileCollection = await getCollection("files");
  let fileId = formData.get("id");
  if (typeof fileId != "string") fileId = "";

  // Check if author?
  const fileInWork = await fileCollection.findOne({
    _id: ObjectId.createFromHexString(fileId),
  });

  if (fileInWork.author.toString() !== user.userId) {
    return redirect("/");
  }
  await fileCollection.deleteOne({ _id: ObjectId.createFromHexString(fileId) });
  return redirect("/");
};

export const editFile = async function (prevState, formData) {
  const user = await getUserFromCookie();

  if (!user) {
    return redirect("/");
  }

  const results = await sharedFileLogic(formData, user);

  if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
    return { errors: results.errors };
  }

  // save in db
  const fileCollection = await getCollection("files");
  let fileId = formData.get("fileId");
  if (typeof fileId != "string") fileId = "";

  // Check if author?
  const fileInWork = await fileCollection.findOne({
    _id: ObjectId.createFromHexString(fileId),
  });
  if (fileInWork.author.toString() !== user.userId) {
    return redirect("/");
  }

  await fileCollection.findOneAndUpdate(
    { _id: ObjectId.createFromHexString(fileId) },
    { $set: results.ourFile }
  );
  return redirect("/");
};
