import {
  EllipsisHorizontalIcon,
  HandThumbDownIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon as HeartIconSolid,
  ShareIcon,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";
import Tippy from "@tippyjs/react";
import Link from "next/link";

const PostCardV2 = () => {
  const handleDislikeButton = async () => {};
  const handleLikeButton = async () => {};
  return (
    <div className="flex justify-center">
      <div className="bg-slate-800 p-4 w-full max-w-xl rounded-md border border-orange-500">
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-orange-500">
          <div className="flex items-center">
            {/* user image */}
            <div className="bg-gray-700 rounded-full h-12 w-12 mr-4"></div>
            {/* username and date */}
            <div className="flex flex-col">
              <span className="font-bold text-slate-300">User name</span>
              <span className="font-light text-slate-300">date</span>
            </div>
            {/* icon */}
          </div>
          <div className="w-10 h-10 rounded-full hover:bg-gray-600 flex justify-center items-center transform transition-colors duration-500 cursor-pointer">
            <EllipsisHorizontalIcon className="w-8 h-8" />
          </div>
        </div>
        {/* desc */}
        <section>
          <p>{"I love tailwind css"}</p>
          {/* images if they have*/}
        </section>
        {/* link | message */}
        <div className="flex justify-start gap-4 pt-4">
          {/* heart icon */}
          <Tippy content={<span>Like</span>}>
            <div className="rounded-full group flex gap-1 pr-3 pl-1 text-red-500 hover:bg-red-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
              <div className="flex justify-center items-center px-1">
                {true ? (
                  <HeartIconSolid className="w-5 h-5" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </div>
              <p className="font-mono text-xs font-light">400</p>
            </div>
          </Tippy>
          {/* thumbs down icon */}
          <Tippy content={<span>Dislike</span>}>
            <div className="rounded-full flex gap-1 pr-3 pl-1 text-orange-500 hover:bg-orange-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
              <div className="flex justify-center items-center p-1">
                {true ? (
                  <HandThumbDownIconSolid className="w-5 h-5" />
                ) : (
                  <HandThumbDownIcon className="w-5 h-5" />
                )}
              </div>
              <p className="font-mono text-xs font-light">400</p>
            </div>
          </Tippy>
          {/* chat icon */}
          <Tippy content={<span>Comments</span>}>
            <Link
              href={"/"}
              className="rounded-full flex gap-1 pr-3 pl-1 text-blue-500 hover:bg-blue-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
            >
              <div className="flex justify-center items-center p-1 rounded-full group gap-1 pr-3 pl-1">
                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
              </div>
              <p className="font-mono text-xs font-light">300</p>
            </Link>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default PostCardV2;
