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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikePost,
  likePost,
  selectPostItems,
} from "@/store/slices/postSlice";
import axios from "axios";
import Image from "next/image";

interface IPostCard {
  id: string;
  date: string;
  time: string;
  color: string;
  body: string;
  likes: number;
  dislikes: number;
  hashtags: string;
  totalComments: number;
  image?: string;
}

const PostCardV2 = (props: IPostCard) => {
  const dispatch = useDispatch();
  const commentArea = "comment-input-area";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(`${currentUrl}/${props.id}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // handle like button
  const handleLikeButton = async () => {
    !isLiked &&
      (await axios
        .get(`${baseUrl}/api/v1/post/${props.id}/like`)
        .then((res) => {
          dispatch(likePost(props.id));
          setIsLiked(true);
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
        .get(`${baseUrl}/api/v1/post/${props.id}/dislike`)
        .then((res) => {
          dispatch(dislikePost(props.id));
          setIsDisliked(true);
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

  return (
    <div className="flex justify-center">
      <div className="bg-slate-800 bg-opacity-40 p-4 w-full">
        <div
          style={{
            borderColor: `#${props.color}`,
          }}
          className="flex justify-between items-center pb-4 mb-4 border-b"
        >
          <div className="flex items-center gap-2">
            {/* user image */}
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/strangers_hub_post.png"
                alt="profile-pic"
                width={50}
                height={50}
                className="h-full w-full object-cover"
              />
            </div>
            {/* username and date */}
            <div className="flex flex-col">
              <span className="font-bold text-slate-300">Stranger</span>
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
            <div className="max-h-[130px] overflow-hidden">
              <p className={"text-sm line-clamp-5 multi-line-truncation"}>
                {props.body}
              </p>
            </div>
            {/* images if they have*/}
            {props.image && (
              <div className="w-full pt-4 relative">
                <Image
                  src="https://images.unsplash.com/photo-1684767555842-ffeea8bd1463?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="post image"
                  width={500}
                  height={500}
                  className="object-cover max-h-[300px] w-full rounded-md"
                />
              </div>
            )}
          </Link>
        </section>
        {/* link | message */}
        <div className="flex justify-between gap-2 mt-4">
          <span className="text-xs text-slate-300">- views</span>
          <span className="text-xs text-slate-300">
            {props.totalComments} Comments
          </span>
        </div>
        <div className="flex justify-between gap-2 mt-4">
          {/* heart icon */}
          <div
            onClick={handleLikeButton}
            className="rounded-full group flex gap-1 pr-3 pl-1 text-red-500 hover:bg-red-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
          >
            <div className="flex justify-center items-center px-1">
              {isLiked ? (
                <HeartIconSolid className="w-4 h-4" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
            </div>
            <p className="font-mono">Like</p>
          </div>
          {/* thumbs down icon */}
          <div
            onClick={handleDislikeButton}
            className="rounded-full flex gap-1 pr-3 pl-1 text-orange-500 hover:bg-orange-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
          >
            <div className="flex justify-center items-center p-1">
              {isDisliked ? (
                <HandThumbDownIconSolid className="w-4 h-4" />
              ) : (
                <HandThumbDownIcon className="w-4 h-4" />
              )}
            </div>
            <p className="font-mono">Dislike</p>
          </div>
          {/* chat icon */}
          <Link
            href={`/post/${props.id}#${commentArea}`}
            className="rounded-full flex gap-1 pr-3 pl-1 text-blue-500 hover:bg-blue-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
          >
            <div className="flex justify-center items-center p-1 ">
              <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
            </div>
            <p className="font-mono">Comments</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCardV2;
