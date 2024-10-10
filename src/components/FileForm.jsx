"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useFormState } from "react-dom";
import { createFile, editFile } from "../../server/fileController";

const FileForm = (props) => {
  const [imageSrc, setImageSrc] = useState();

  const [signature, setSignature] = useState("");
  const [public_id, setPublic_id] = useState("");
  const [version, setVersion] = useState("");

  const [secure_url, setSecure_url] = useState("");

  let chooseAction;

  if (props.action === "create") {
    chooseAction = createFile;
  }
  if (props.action === "edit") {
    chooseAction = editFile;
  }

  const [formState, formAction] = useFormState(chooseAction, {});
  return (
    <div>
      <form action={formAction} className="max-w-xs mx-auto">
        {formState.errors?.line1 && (
          <div
            role="alert"
            className="mx-auto flex flex-row items-center justify-center gap-5 bg-amber-400 text-black rounded-md p-3 w-full mb-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formState.errors?.line1}</span>
          </div>
        )}
        <input
          type="text"
          name="line1"
          defaultValue={props.file?.line1}
          autoComplete="off"
          placeholder="number"
          className="mb-3 bg-white border-2 border-gray-300 rounded-md p-3 w-full"
        />

        {formState.errors?.line2 && (
          <div
            role="alert"
            className="mx-auto flex flex-row items-center justify-center gap-5 bg-amber-400 text-black rounded-md p-3 w-full mb-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formState.errors?.line2}</span>
          </div>
        )}
        <input
          type="text"
          name="line2"
          defaultValue={props.file?.line2}
          autoComplete="off"
          placeholder="number"
          className="mb-3 bg-white border-2 border-gray-300 rounded-md p-3 w-full"
        />

        {formState.errors?.line3 && (
          <div
            role="alert"
            className="mx-auto flex flex-row items-center justify-center gap-5 bg-amber-400 text-black rounded-md p-3 w-full mb-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formState.errors?.line3}</span>
          </div>
        )}
        <input
          type="text"
          name="line3"
          defaultValue={props.file?.line3}
          autoComplete="off"
          placeholder="number"
          className="mb-3 bg-white border-2 border-gray-300 rounded-md p-3 w-full"
        />
        <div>
          <CldUploadWidget
            onSuccess={(result, { widget }) => {
              console.log(result?.info);
              setSignature(result?.info.signature);
              setPublic_id(result?.info.public_id);
              setVersion(result?.info.version);
              setSecure_url(result?.info.secure_url);
              setImageSrc(result?.info.secure_url);
            }}
            onQueuesEnd={(result, { widget }) => {
              widget.close();
            }}
            signatureEndpoint="/widget-signature"
          >
            {({ open }) => {
              function handleClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button
                  className="p-3 rounded-md bg-blue-400 text-white w-full mb-3"
                  onClick={handleClick}
                >
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>

          <img className="rounded-md mb-3" src={imageSrc} />

          {/* {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )} */}

          {/* {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )} */}
        </div>
        <input type="hidden" name="public_id" value={public_id} />
        <input type="hidden" name="version" value={version} />
        <input type="hidden" name="signature" value={signature} />
        <input type="hidden" name="url" value={secure_url} />
        <input
          type="hidden"
          name="fileId"
          defaultValue={props.file?._id.toString()}
        />

        <button className="rounded-md bg-blue-400 p-3 w-full text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FileForm;
