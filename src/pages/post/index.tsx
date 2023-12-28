import { useEffect, useState } from "react";
import { ArrowSmallUpIcon } from "@heroicons/react/24/outline";

import Seo from "@/components/SEO";
import PostCardSkeleton from "@/components/postCardSkeleton";
import axios from "axios";
import PostInputCard from "@/components/PostInputCard";
import PostContainer from "@/components/PostContainer";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [onSearchMode, setOnSearchMode] = useState<boolean>(false);
  const [hasMorePost, setHasMorePost] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [limit, setLimit] = useState<number>(40);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const cardSkeleton = [];

  // when to post modal is closed
  useEffect(() => {
    !isModalOpen &&
      axios
        .get(`${baseUrl}/api/v1/post?page=${1}&limit=${limit}`)
        .then((res) => {
          setPageIndex(2);
          setHasMorePost(true);
          setPosts(res.data.posts);
          setOnSearchMode(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
  }, [baseUrl, isModalOpen, limit]);

  return (
    <>
      <Seo
        templateTitle="Share Your Thoughts"
        description="Join us today and let your voice be heard - without ever having to reveal your identity!"
      />
      <main className="container mx-auto grid grid-cols-4 h-screen max-w-6xl">
        <div className="">gird 1</div>
        <div className="bg-slate-800 bg-opacity-10 col-span-2 pt-20">
          {/* Post input area */}
          <PostInputCard />
          {/* space */}
          <div className="h-5" />
          {/* post container */}
          <PostContainer />
        </div>
        <div className="">gird 3</div>
      </main>
    </>
  );
};

export default Post;
