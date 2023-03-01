import Seo from "@/components/SEO";
import PostFilter from "@/components/postFilter";
import PostCard from "@/components/postCard";
import PostCardSkeleton from "@/components/postCardSkeleton";
import PostLayout from "@/components/postLayout";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Post = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const cardSkeleton = [];
  const [comment, setComment] = useState<string>("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);

  for (let i = 0; i < 12; i++) {
    cardSkeleton.push(<PostCardSkeleton />);
  }
  // Queries
  //   const { data, isSuccess, isLoading } = useQuery({
  //     queryKey: ["getPosts"],
  //     queryFn: () => {
  //       return axios
  //         .get(`${baseUrl}/api/v1/post?page=1&limit=100`)
  //         .then((res) => {
  //           return res.data;
  //         });
  //     },
  //   });

  return (
    <>
      <Seo />
      {/* chat layout */}
      <section className="max-w-5xl flex flex-col h-screen mx-0 md:mx-auto pt-20 pb-10">
        {/* Chat Section */}
        <section className="relative border-b border-slate-600 rounded-md flex-1 w-full">
          {/* welcome message */}
          {showWelcomeMessage && (
            <div className="absolute w-full h-fit flex flex-col gap-2 px-2 md:px-10 py-2 bg-gradient-to-r from-green-500/10 to-slate-900">
              <div className="flex justify-between">
                <h3 className="text-green-500 text-sm md:text-base">
                  Welcome to Strangers Hub Live Chat
                </h3>

                <XMarkIcon
                  onClick={() => setShowWelcomeMessage(false)}
                  className="h-6 w-6 text-orange-500 cursor-pointer"
                  aria-hidden="true"
                />
              </div>
              <p className="text-xs md:text-sm text-green-300/80 tracking-wide">
                Welcome to our anonymous live chat where you can connect with
                strangers from around the world. We kindly request that you
                maintain a respectful and responsible attitude towards your
                fellow users, and help us create a warm and friendly atmosphere
                for all to enjoy.
              </p>
            </div>
          )}
          {/* conversation list */}
          <div className="h-full flex flex-col-reverse px-2 pb-10">
            <div>this is my love for you 😘</div>
          </div>
        </section>
        {/* comment input area */}
        <form
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   mutate();
          // }}
          id="comment-input-area"
          className="mt-2 flex gap-1 justify-start items-center px-2 lg:px-5 py-2 rounded-md bg-slate-700/20 mx-2 lg:mx-0"
        >
          <input
            type="text"
            required={true}
            maxLength={400}
            className="flex-1 bg-transparent focus:border-none px-4 ring-0 focus:ring-0 focus:outline-none"
            placeholder="Write a message..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="border-l border-slate-500 w-fit flex sm:flex-none justify-center items-center gap-3 cursor-pointer px-2 lg:px-4 p-2"
          >
            <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
            <p className="hidden lg:block">Send</p>
          </button>
        </form>
      </section>
    </>
  );
};

export default Post;
