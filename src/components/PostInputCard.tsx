import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import {
  CameraIcon,
  ChevronDownIcon,
  PaperClipIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const PostInputCard = () => {
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
      <hr className="border-0 h-[1px] bg-green-500" />
      {/* file option & post button */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {/* image button */}
          <Button
            icon={<PhotoIcon className="w-4 h-4 text-blue-500" />}
            name="Image"
            className="text-sm font-semibold tracking-wide"
          />
          {/* video button */}
          <Button
            icon={<CameraIcon className="w-4 h-4 text-orange-500" />}
            name="Video"
            className="text-sm font-semibold tracking-wide"
          />
          {/* attachment button */}
          <Button
            icon={<PaperClipIcon className="w-4 h-4 text-green-500" />}
            name="Attachment"
            className="text-sm font-semibold tracking-wide"
          />
        </div>
        {/* color options */}
        <button className="flex justify-center items-center gap-1 hover:bg-gray-600 transform transition-colors duration-500 px-2 py-1 rounded-md">
          <span className="w-4 h-4 rounded-sm bg-green-500" />
          <ChevronDownIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PostInputCard;
