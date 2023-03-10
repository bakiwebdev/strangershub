import { PostInterface } from "@/Interface/PostInterface";
import {
  HandThumbDownIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";

const PostCard = ({
  id,
  date,
  time,
  title,
  body,
  likes,
  dislikes,
  color,
}: PostInterface) => {
  const commentArea = "comment-input-area";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [postLikes, setPostLikes] = useState<number>(likes);
  const [postDislikes, setPostDislikes] = useState<number>(dislikes);
  const [commentLength, setCommentLength] = useState<number>(0);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(`${currentUrl}/${id}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // handle like button
  const handleLikeButton = async () => {
    await axios.get(`${baseUrl}/api/v1/post/${id}/like`).then((res) => {
      setPostLikes(res.data.likes as number);
    });
  };

  // handle dislike button
  const handleDislikeButton = async () => {
    await axios.get(`${baseUrl}/api/v1/post/${id}/dislike`).then((res) => {
      setPostDislikes(res.data.dislikes);
    });
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/post/${id}/comment?page1&limit=1`)
      .then((res) => setCommentLength(res.data.total));
  }, [baseUrl, id]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.2, transition: { ease: "easeInOut" } }}
      whileTap={{ scale: 1.1, transition: { ease: "easeInOut" } }}
      style={{
        borderColor: `#${color}`,
      }}
      className={`bg-gray-800 flex flex-col p-4 border rounded-md cursor-pointer`}
    >
      <Link href={`/post/${id}`} className="flex-1">
        {/* title */}
        <div className="flex flex-col gap-1">
          {/* note title */}
          <h3
            style={{
              color: `#${color}`,
            }}
            className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden"
          >
            {title}
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
      <div className="flex justify-between mt-2 px-4 sm:px-3 md:px-2">
        {/* heart icon */}
        <div
          onClick={handleLikeButton}
          className="group flex gap-1 text-red-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
        >
          <Tippy content={<span>Like</span>}>
            <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-red-500/10 transform transition-all ease-in-out duration-500">
              <HeartIcon className="w-4 h-4" />
            </div>
          </Tippy>
          <p className="font-mono text-xs font-light">{postLikes}</p>
        </div>
        {/* thumbs down icon */}
        <div
          onClick={handleDislikeButton}
          className="group flex gap-1 text-orange-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
        >
          <Tippy content={<span>Dislike</span>}>
            <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-orange-500/10 transform transition-all ease-in-out duration-500">
              <HandThumbDownIcon className="w-4 h-4" />
            </div>
          </Tippy>
          <p className="font-mono text-xs font-light">{postDislikes}</p>
        </div>
        {/* chat icon */}
        <Link
          href={`/post/${id}#${commentArea}`}
          className="group flex gap-1 text-blue-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
        >
          <Tippy content={<span>Comments</span>}>
            <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-blue-500/10 transform transition-all ease-in-out duration-500">
              <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
            </div>
          </Tippy>
          <p className="font-mono text-xs font-light">{commentLength}</p>
        </Link>
        {/* share icon */}
        <div
          onClick={handleCopyUrl}
          className="group flex gap-1 text-green-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
        >
          <Tippy
            content={<span>{isCopied ? "Copied!" : "Share URL"}</span>}
            trigger="click"
            inertia={true}
          >
            <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-green-500/10 transform transition-all ease-in-out duration-500">
              <ShareIcon className="w-4 h-4" />
            </div>
          </Tippy>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
