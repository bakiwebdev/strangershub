import {
  EllipsisHorizontalIcon,
  HandThumbDownIcon,
  HeartIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  ShareIcon,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";
import Tippy from "@tippyjs/react";
import Link from "next/link";

interface IPostCard {
  id: string;
  date: string;
  time: string;
  color: string;
  body: string;
}

const PostCardV2 = (props: IPostCard) => {
  const handleDislikeButton = async () => {};
  const handleLikeButton = async () => {};
  return (
    <div className="flex justify-center">
      <div
        style={{
          borderColor: `#${props.color}`,
        }}
        className="bg-slate-800 p-4 w-full max-w-xl rounded-md border"
      >
        <div
          style={{
            borderColor: `#${props.color}`,
          }}
          className="flex justify-between items-center pb-4 mb-4 border-b"
        >
          <div className="flex items-center">
            {/* user image */}
            <div className="bg-gray-700 rounded-full h-12 w-12 mr-4"></div>
            {/* username and date */}
            <div className="flex flex-col">
              <span className="font-bold text-slate-300">User name</span>
              <span className="font-light text-slate-300 text-xs tracking-wider">
                {props.date} - {props.time}
              </span>
            </div>
            {/* icon */}
          </div>
          <div className="w-10 h-10 rounded-full hover:bg-gray-600 flex justify-center items-center transform transition-colors duration-500 cursor-pointer">
            <EllipsisHorizontalIcon className="w-8 h-8" />
          </div>
        </div>
        {/* post body */}
        <section>
          <Link href={`/post/${props.id}`}>
            <div dangerouslySetInnerHTML={{ __html: props.body }} />
            {/* images if they have*/}
          </Link>
        </section>
        {/* link | message */}
        <div className="flex justify-start gap-2 mt-4">
          {/* heart icon */}
          <Tippy content={<span>Like</span>}>
            <div className="rounded-full group flex gap-1 pr-3 pl-1 text-red-500 hover:bg-red-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
              <div className="flex justify-center items-center px-1">
                {false ? (
                  <HeartIconSolid className="w-4 h-4" />
                ) : (
                  <HeartIcon className="w-4 h-4" />
                )}
              </div>
              <p className="font-mono">400</p>
            </div>
          </Tippy>
          {/* thumbs down icon */}
          <Tippy content={<span>Dislike</span>}>
            <div className="rounded-full flex gap-1 pr-3 pl-1 text-orange-500 hover:bg-orange-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
              <div className="flex justify-center items-center p-1">
                {false ? (
                  <HandThumbDownIconSolid className="w-4 h-4" />
                ) : (
                  <HandThumbDownIcon className="w-4 h-4" />
                )}
              </div>
              <p className="font-mono">400</p>
            </div>
          </Tippy>
          {/* chat icon */}
          <Tippy content={<span>Comments</span>}>
            <Link
              href={"/"}
              className="rounded-full flex gap-1 pr-3 pl-1 text-blue-500 hover:bg-blue-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
            >
              <div className="flex justify-center items-center p-1 ">
                <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
              </div>
              <p className="font-mono">300</p>
            </Link>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default PostCardV2;
