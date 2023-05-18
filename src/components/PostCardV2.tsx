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
}

const PostCardV2 = (props: IPostCard) => {
  const postItems = useSelector(selectPostItems);
  const dispatch = useDispatch();
  const commentArea = "comment-input-area";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [postLikes, setPostLikes] = useState<number>(props.likes);
  const [postDislikes, setPostDislikes] = useState<number>(props.dislikes);
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
          setPostLikes(res.data.likes as number);
          dispatch(likePost(props.id));
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
          setPostDislikes(res.data.dislikes);
          dispatch(dislikePost(props.id));
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
      <div className="bg-slate-800 p-4 w-full max-w-xl rounded-md">
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
            <div dangerouslySetInnerHTML={{ __html: props.body }} className="text-sm tracking-wider"/>
            {/* images if they have*/}
          </Link>
        </section>
        {/* link | message */}
        <div className="flex justify-start gap-2 mt-4">
          {/* heart icon */}
          <Tippy content={<span>Like</span>}>
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
              <p className="font-mono">{postLikes}</p>
            </div>
          </Tippy>
          {/* thumbs down icon */}
          <Tippy content={<span>Dislike</span>}>
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
              <p className="font-mono">{postDislikes}</p>
            </div>
          </Tippy>
          {/* chat icon */}
          <Tippy content={<span>Comments</span>}>
            <Link
              href={`/post/${props.id}#${commentArea}`}
              className="rounded-full flex gap-1 pr-3 pl-1 text-blue-500 hover:bg-blue-500/10 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
            >
              <div className="flex justify-center items-center p-1 ">
                <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
              </div>
              <p className="font-mono">{props.totalComments}</p>
            </Link>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default PostCardV2;
