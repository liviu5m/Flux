import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";

type Image = {
  previewUrl: string;
  url: string;
};

export default function ImageInput({
  images,
  setImages,
}: {
  images: Image[];
  setImages: (e: Image[]) => void;
}) {
  

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    const previewUrl = URL.createObjectURL(file);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];

          try {
            const response = await axios.post("/api/cloudinary", {
              file: `data:image/jpeg;base64,${base64String}`,
            });
            setImages([
              ...images,
              { previewUrl, url: response.data.secure_url },
            ]);
          } catch (error) {
            console.error("Error uploading to Cloudinary:", error);
          }
        }
      };

      reader.onerror = () => {
        console.error("Error reading file:", reader.error);
      };
    } catch (error) {
      console.error("Error preparing file for upload:", error);
    }
  };

  return (
    <div className="text-[#F9F7F7]">
      <div className="flex items-center gap-5">
        <label
          htmlFor="image"
          className="flex items-center justify-center gap-3 cursor-pointer px-4 py-2 rounded-lg bg-[#3F72AF]"
        >
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={(e) => handleFileChange(e)}
          />
          <FontAwesomeIcon icon={faPlus} />
          <h2>Add an image</h2>
        </label>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-5">
        {images.map((image, i) => {
          return (
            <div key={i} className="relative">
              <div
                className="absolute top-1 right-1 cursor-pointer text-red-500"
                onClick={() =>
                  setImages(images.filter((image, ind) => ind != i))
                }
              >
                <FontAwesomeIcon icon={faX} />
              </div>
              <img key={i} src={image.previewUrl} className="rounded-lg" />;
            </div>
          );
        })}
      </div>
    </div>
  );
}
