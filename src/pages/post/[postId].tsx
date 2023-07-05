import { CommentInterface, PostInterface } from "@/Interface/PostInterface";
import CommentCard from "@/components/CommentCard";
import {
  ArrowLeftIcon,
  GlobeEuropeAfricaIcon,
  HandThumbDownIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon as HandThumbDownIconSolid,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../_app";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import Seo from "@/components/SEO";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikePost,
  likePost,
  selectPostItems,
} from "@/store/slices/postSlice";
import { useRouter } from "next/router";
import { convert } from "html-to-text";

// get server side props
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { res } = context;
  const postId = context.query.postId;

  // Fetch data from external API
  const post = await axios
    .get(`${baseUrl}/api/v1/post/${postId}`)
    .then((res) => {
      return res.data;
    });

  if (!post) {
    res.setHeader("location", "/posts");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  // Pass data to the page via props
  return {
    props: {
      ...post,
      id: post._id,
    },
  };
}

const Post = (post: PostInterface) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [postData, setPostData] = useState<PostInterface>(post);
  const [comment, setComment] = useState<string>("");
  const postItems = useSelector(selectPostItems);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const data = postItems.find((p: any) => p.id === post.id);
    if (data) {
      setIsLiked(data.like);
      setIsDisliked(data.dislike);
    }
  }, [post.id, postItems]);

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(`${currentUrl}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const { mutate, isLoading: isPostCommentLoading } = useMutation({
    mutationFn: () => {
      return axios.post(`${baseUrl}/api/v1/post/${postData.id}/comment`, {
        comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getComments"] });
      setComment("");
    },
  });

  // handle like button
  const handleLikeButton = async () => {
    !isLiked &&
      (await axios
        .get(`${baseUrl}/api/v1/post/${postData.id}/like`)
        .then((res) => {
          setPostData({ ...postData, likes: res.data.likes });
          dispatch(likePost(post.id));
          queryClient.invalidateQueries({ queryKey: ["getPosts"] });
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
        .get(`${baseUrl}/api/v1/post/${postData.id}/dislike`)
        .then((res) => {
          setPostData({ ...postData, dislikes: res.data.dislikes });
          queryClient.invalidateQueries({ queryKey: ["getPosts"] });
          dispatch(dislikePost(post.id));
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

  // Queries
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getComments"],
    queryFn: () => {
      return axios
        .get(`${baseUrl}/api/v1/post/${postData.id}/comment`)
        .then((res) => {
          return res.data;
        });
    },
  });

  const handleBackClick = () => {
    router.back();
  };

  const getTitle = (title: string) => {
    if (title === "sh_no_title") return;

    return title;
  };
  return (
    <>
      <Seo
        date={`${postData.date} - ${postData.time}`}
        templateTitle={postData.title}
        description={convert(postData.body, { wordwrap: 130 })}
      />
      <section className="max-w-4xl mx-auto pt-28 px-4 sm:px-8 md:px-6 mb-10 flex flex-col gap-4 relative">
        {/* Back icon */}
        <Link
          href={"/post"}
          className="flex gap-3 justify-center items-center w-fit float-left text-orange-500 px-4 py-2 rounded-full bg-orange-500/10 cursor-pointer hover:bg-orange-500/20 transition translate"
          onClick={handleBackClick}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <p className="text-sm">Back</p>
        </Link>
        {/* posted time zone & reaction*/}
        <div className="flex justify-between flex-wrap gap-2">
          {/* posted time */}
          <div className="flex justify-center items-center gap-2 w-fit my-2 min-w-fit">
            <GlobeEuropeAfricaIcon className="w-5 h-5 text-gray-100" />
            <p className="text-md text-gray-400">
              {postData.date} - {postData.time}
            </p>
          </div>
          {/* reactions */}
          <div className="flex justify-between gap-10 mt-2 px-4 sm:px-3 md:px-2 z-10">
            {/* heart icon */}

            <div
              onClick={handleLikeButton}
              className="group flex gap-1 text-red-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
            >
              <Tippy content={<span>{"Like"}</span>} inertia={true}>
                <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-red-500/10 transform transition-all ease-in-out duration-500">
                  {isLiked ? (
                    <HeartIconSolid className="w-4 h-4" />
                  ) : (
                    <HeartIcon className="w-4 h-4" />
                  )}
                </div>
              </Tippy>
              <p className="font-mono text-xs font-light">{postData.likes}</p>
            </div>
            {/* thumbs down icon */}
            <div
              onClick={handleDislikeButton}
              className="group flex gap-1 text-orange-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer"
            >
              <Tippy content={<span>{"Dislike"}</span>} inertia={true}>
                <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-orange-500/10 transform transition-all ease-in-out duration-500">
                  {isDisliked ? (
                    <HandThumbDownIconSolid className="w-4 h-4" />
                  ) : (
                    <HandThumbDownIcon className="w-4 h-4" />
                  )}
                </div>
              </Tippy>
              <p className="font-mono text-xs font-light">
                {postData.dislikes}
              </p>
            </div>
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
        </div>
        {/* post body */}
        <pre
          className="text-xl px-1 py-2 max-w-full whitespace-pre-wrap"
          style={{
            color: `#${postData.color}`,
          }}
        >
          {getTitle(postData.title) && <br />}
          {getTitle(postData.title) ? convert(postData.body) : postData.body}
        </pre>
        {/* hash tag lists */}
        <div className="flex justify-start items-center my-4 rounded-full gap-2 flex-wrap">
          {postData.hashtags.map((hashtag, idx) => {
            return (
              <span
                key={idx}
                className="py-1 px-3 rounded-full bg-blue-500/10 text-sm text-blue-500"
              >
                {hashtag}
              </span>
            );
          })}
        </div>
        {/* comment section */}
        <div className="flex flex-col my-5 sticky top-40 max-h-[80vh] gap-6">
          {/* comment input area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
            id="comment-input-area"
            className="mt-2 flex gap-1 justify-start items-center px-5 py-2 rounded-md bg-slate-700/20"
          >
            <input
              type="text"
              required={true}
              maxLength={400}
              className="flex-1 bg-transparent focus:border-none ring-0 focus:ring-0 focus:outline-none"
              placeholder="What's your thought ?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="flex sm:flex-none justify-center items-center gap-3 cursor-pointer hover:bg-slate-600/20 px-2 md:px-4 py-2 rounded-full"
            >
              <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
              <p className="hidden md:block">Send</p>
            </button>
          </form>
          <div className="flex gap-4 justify-start items-center px-5 py-2 rounded-md text-gray-300">
            <h3 id="comments">Comments</h3>
            {isSuccess && data.comments.length > 0 && (
              <span className="text-xs px-3 py-1 rounded-full text-green-500 bg-green-500/20">{`${data.comments.length} +`}</span>
            )}
          </div>
          {/* list of comments */}
          <div className="flex flex-col gap-4 overflow-y-scroll">
            {/* if no comment is found */}
            {isSuccess && data.comments.length <= 0 && (
              <p className="text-center text-gray-600">No comment</p>
            )}
            {(isPostCommentLoading || isLoading) && (
              <p className="text-center text-gray-400">Loading ...</p>
            )}
            {/* if there is a comment */}
            {isSuccess &&
              data.comments.map((comment: CommentInterface) => {
                return (
                  <CommentCard
                    key={comment._id}
                    date={comment.date}
                    time={comment.time}
                    body={comment.body}
                  />
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;
