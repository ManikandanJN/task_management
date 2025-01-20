import React, { useState } from "react";
import { Label } from "./label";
import { CloseIcon } from "../../icons";

interface UploadImageProps {
  initialImage: string;
  onChange: (file: File | null) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({
  initialImage,
  onChange,
}) => {
  const [previowURL, setPreviowURL] = useState<string | null>(initialImage);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviowURL(fileUrl);
      onChange(fileUrl);
    }
  };

  return (
    <div className="">
      <Label title="Attachment" />
      <div
        className="border border-gray-300 rounded-lg sm:text-base text-sm p-2 sm:p-4 bg-gray-50 text-gray-500 flex justify-center items-center"
        style={{ height: "50px" }}
      >
        <span>
          {"Drop your files here or "}
          <label
            htmlFor="file-upload"
            className="text-blue-500 underline cursor-pointer"
          >
            Update
          </label>
        </span>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {previowURL && (
        <div className="relative mt-3 w-1/5 h-1/5">
          <img
            src={previowURL}
            alt="Uploaded Preview"
            className="aspect-auto rounded border"
          />
          <span
            onClick={() => {
              setPreviowURL("");
              onChange("");
            }}
            className="absolute top-0 right-0 cursor-pointer bg-medium-gray rounded-full p-1"
          >
            <CloseIcon className="h-4 w-4 text-black" />
          </span>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
