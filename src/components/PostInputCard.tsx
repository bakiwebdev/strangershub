import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import {
  CameraIcon,
  PaperClipIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import TooltipColorOption from "./TooltipColorOption";
import { useState } from "react";

const PostInputCard = () => {
  const [selectedColor, setSelectedColor] = useState<string>("00ED00");
  return (
    <div className="flex flex-col rounded-md bg-slate-800 p-6 gap-4">
      {/* profile & input area */}
      <div className="flex justify-center items-center gap-2">
        <Link href="">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              src="/strangers_hub_post.png"
              alt="profile-pic"
              width={50}
              height={50}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
        <Link href={"/post/new"} className="w-full rounded-full h-10">
          <input
            type="text"
            className="w-full rounded-full h-10 bg-slate-700 px-4"
            placeholder="Share something..."
          />
        </Link>
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
          {/* image button */}
          <Button
            icon={<PhotoIcon className="w-4 h-4 text-blue-500" />}
            name="Image"
            className="text-sm font-semibold tracking-wide opacity-50 cursor-not-allowed"
          />
          {/* video button */}
          <Button
            icon={<CameraIcon className="w-4 h-4 text-orange-500" />}
            name="Video"
            className="text-sm font-semibold tracking-wide opacity-50 cursor-not-allowed"
          />
          {/* attachment button */}
          <Button
            icon={<PaperClipIcon className="w-4 h-4 text-green-500" />}
            name="Attachment"
            className="text-sm font-semibold tracking-wide opacity-50 cursor-not-allowed"
          />
        </div>
        {/* color options */}
        <TooltipColorOption
          onValueChange={(color) => {
            setSelectedColor(color);
          }}
        />
      </div>
    </div>
  );
};

export default PostInputCard;
