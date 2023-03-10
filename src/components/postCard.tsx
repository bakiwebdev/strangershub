import { PostInterface } from "@/Interface/PostInterface";
import {
  HandThumbDownIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon as HandThumbDownIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikePost,
  likePost,
  selectPostItems,
} from "@/store/slices/postSlice";

const PostCard = ({
  id,
  date,
  time,
  title,
  body,
  likes,
  dislikes,
  color,
  totalComments,
}: PostInterface) => {
  const postItems = useSelector(selectPostItems);
  const dispatch = useDispatch();
  const commentArea = "comment-input-area";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [postLikes, setPostLikes] = useState<number>(likes);
  const [postDislikes, setPostDislikes] = useState<number>(dislikes);
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

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
    !isLiked &&
      (await axios
        .get(`${baseUrl}/api/v1/post/${id}/like`)
        .then((res) => {
          setPostLikes(res.data.likes as number);
          dispatch(likePost(id));
        })
        .catch((error) => {
          if (error.response && error.response.status === 429) {
            alert(
              "So many requests. Please wait a few minutes before trying again."
            );
          } else {
            alert("Oops, something went wrong. Please try again later.");
          }
        }));
  };

  // handle dislike button
  const handleDislikeButton = async () => {
    !isDisliked &&
      (await axios
        .get(`${baseUrl}/api/v1/post/${id}/dislike`)
        .then((res) => {
          setPostDislikes(res.data.dislikes);
          dispatch(dislikePost(id));
        })
        .catch((error) => {
          if (error.response && error.response.status === 429) {
            alert(
              "So many requests. Please wait a few minutes before trying again."
            );
          } else {
            alert("Oops, something went wrong. Please try again later.");
          }
        }));
  };

  useEffect(() => {
    const post = postItems.find((p: any) => p.id === id);
    if (post) {
      setIsLiked(post.like);
      setIsDisliked(post.dislike);
    }
  }, [id, postItems]);

  return (
    <motion.div
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
              {isLiked ? (
                <HeartIconSolid className="w-4 h-4" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
            </div>
          </Tippy>
          <p className="font-mono text-xs font-light">{postLikes}</p>
        </div>
        {/* thumbs down icon */}
        <div
          onClick={handleDislikeButton}
          className="group flex gap-1 text-orange-500  transform transition-all ease-in-out duration-500 items-center cursor-pointer"
        >
          <Tippy content={<span>Dislike</span>}>
            <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-orange-500/10 transform transition-all ease-in-out duration-500">
              {isDisliked ? (
                <HandThumbDownIconSolid className="w-4 h-4" />
              ) : (
                <HandThumbDownIcon className="w-4 h-4" />
              )}
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
          <p className="font-mono text-xs font-light">{totalComments}</p>
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
