import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { CameraIcon } from "@heroicons/react/24/outline";
import TooltipColorOption from "./TooltipColorOption";
import { useState } from "react";
import InputTextArea from "./InputTextArea";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import uploadImage from "@/libs/uploadImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface IPostInputCard {
  callback: () => void;
}

const PostInputCard = () => {
  const [text, setText] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("FF7C00");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const newPostMutation = useMutation({
    mutationFn: async () => {
      if (selectedImage) {
        const image = await fetch(selectedImage);
        const blob = await image.blob();
        const file = new File([blob], "image.jpg", { type: blob.type });
        await uploadImage(file);
      }
      return axios.post(`${baseUrl}/api/v1/post`, {
        title: "sh_no_title",
        body: text,
        hashtags: "",
        color: selectedColor,
      });
    },
    onSuccess: () => {
      setText("");
      setSelectedImage(null);
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return (
    <div className="flex flex-col rounded-md bg-slate-800 bg-opacity-40 p-2 md:p-6 gap-4 h-fit">
      {/* profile & input area */}
      <div className="flex justify-center items-start gap-2">
        <Link href="">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
            <Image
              src="/strangers_hub_post.png"
              alt="profile-pic"
              width={50}
              height={50}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
        <InputTextArea
          messageValue={text}
          setMessageValue={(value) => setText(value)}
          selectedImage={selectedImage}
          resetImage={() => setSelectedImage(null)}
        />
      </div>
      {/* horizontal line */}
      <hr
        style={{
          backgroundColor: `#${selectedColor}`,
        }}
        className="border-0 h-[1px]"
      />
      {/* file option & post button */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {/* color options */}
          <TooltipColorOption
            onValueChange={(color) => {
              setSelectedColor(color);
            }}
          />
          {/* image button */}
          <span className="hidden md:block">
            <ImageUploader selectedImg={(img) => setSelectedImage(img)} />
          </span>
          {/* video button */}
          <span className="hidden md:block">
            <Button
              icon={<CameraIcon className="w-4 h-4 text-orange-500" />}
              name="Video"
              className="text-sm font-semibold tracking-wide opacity-50 cursor-not-allowed"
            />
          </span>
        </div>
        {/* post button */}
        <Button
          disabled={newPostMutation.isLoading}
          onClick={() => newPostMutation.mutate()}
          name="Post"
          className="rounded-md bg-orange-500 px-4 py-2 text-sm"
        />
      </div>
    </div>
  );
};

export default PostInputCard;
