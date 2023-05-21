import { useState, ChangeEvent } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface IImageUploader {
  selectedImg: (img: string) => void;
}

const ImageUploader = (props: IImageUploader) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      props.selectedImg(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="image-upload-input"
      />
      <label htmlFor="image-upload-input">
        <div className="flex justify-center items-center gap-1 cursor-pointer">
          <PhotoIcon className="w-4 h-4 text-blue-500" />
          <p>Image</p>
        </div>
      </label>
    </div>
  );
};

export default ImageUploader;
