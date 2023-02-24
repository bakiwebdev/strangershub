import {
  HandThumbDownIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from "next/link";

interface WordCardProps {
  id: string;
  date: string;
  time: string;
  heading: string;
  body: string;
  likes: number;
  dislikes: number;
  comments?: number;
  color: string;
}

const WordCard = ({
  id,
  date,
  time,
  heading,
  body,
  likes,
  dislikes,
  comments = 0,
  color,
}: WordCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 1.1 }}
      style={{
        borderColor: `#${color}`,
      }}
      className={`bg-gray-800 flex flex-col p-4 border rounded-md cursor-pointer`}
    >
      <Link href={`/words/${id}`} className="flex-1">
        {/* heading */}
        <div className="flex flex-col gap-1">
          {/* note title */}
          <h3
            style={{
              color: `#${color}`,
            }}
            className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden"
          >
            {heading}
          </h3>
          <div className="flex justify-center items-center gap-2 w-fit">
            {/* actual data */}
            <p className="text-xs text-gray-400">
              {date} - {time}
            </p>
            <GlobeEuropeAfricaIcon className="w-3 h-3 text-gray-200" />
          </div>
        </div>
        {/* body */}
        <section
          style={{
            color: `#${color}`,
          }}
          className="my-2 bg-slate-900/20 py-2 px-3 rounded-lg multi-line-truncation max-h-[130px]"
        >
          {body}
        </section>
      </Link>
      {/* like, dislike, comment */}
      <div
        onClick={() => console.log("reaction button clicked")}
        className="flex justify-between mt-2 px-4 sm:px-3 md:px-2 z-10"
      >
        {/* heart icon */}
        <div className="group flex gap-1 text-red-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
          <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-red-500/10 transform transition-all ease-in-out duration-500">
            <HeartIcon className="w-4 h-4" />
          </div>
          <p className="font-mono text-xs font-light">{likes}</p>
        </div>
        {/* thumbs down icon */}
        <div className="group flex gap-1 text-orange-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
          <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-orange-500/10 transform transition-all ease-in-out duration-500">
            <HandThumbDownIcon className="w-4 h-4" />
          </div>
          <p className="font-mono text-xs font-light">{dislikes}</p>
        </div>
        {/* chat icon */}
        <div className="group flex gap-1 text-blue-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
          <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-blue-500/10 transform transition-all ease-in-out duration-500">
            <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
          </div>
          <p className="font-mono text-xs font-light">{comments}</p>
        </div>
        {/* share icon */}
        <div className="group flex gap-1 text-green-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
          <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-green-500/10 transform transition-all ease-in-out duration-500">
            <ShareIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WordCard;
