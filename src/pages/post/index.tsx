import Seo from "@/components/SEO";
import PostFilter from "@/components/postFilter";
import PostCard from "@/components/postCard";
import PostCardSkeleton from "@/components/postCardSkeleton";
import PostLayout from "@/components/postLayout";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  BarsArrowDownIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

const Post = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const cardSkeleton = [];

  for (let i = 0; i < 12; i++) {
    cardSkeleton.push(<PostCardSkeleton />);
  }
  // Queries
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => {
      return axios
        .get(`${baseUrl}/api/v1/post?page=1&limit=100`)
        .then((res) => {
          return res.data;
        });
    },
  });

  return (
    <>
      <Seo />
      <PostFilter />
      <div className="flex justify-center items-center max-w-7xl mx-auto mt-28 px-10 gap-2">
        {/* search size */}
        <div className="w-full px-5 py-3 rounded-md border border-orange-500/50 shadow-xl shadow-orange-500/20 flex justify-center items-center gap-2">
          <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
          <input
            className="bg-transparent w-32 outline-none md:mx-2 flex-1"
            type="search"
            placeholder="Search..."
          />
          <div className="border border-slate-400 h-4 mx-1 md:mx-2"></div>
          <div className="flex justify-center items-center gap-2 md:gap-4 w-fit">
            <p className="hidden text-slate-400">Sort</p>
            <BarsArrowDownIcon className="w-5 h-5 text-orange-500" />
          </div>
        </div>
        {/* post button */}
        <button
          // onClick={openModal}
          className="flex justify-center items-center w-fit px-2 md:px-5 py-2 rounded-md text-slate-800 bg-orange-500 font-semibold"
        >
          <p className="hidden md:flex whitespace-nowrap">
            Have something to say ?
          </p>
          <PencilIcon className="w-7 h-7 block md:hidden" />
        </button>
      </div>
      <PostLayout>
        {isLoading && cardSkeleton}
        {isSuccess &&
          data.posts.map((post: any, idx: number) => {
            return (
              <PostCard
                key={post._id + idx}
                id={post._id}
                date={post.date}
                time={post.time}
                title={post.title}
                body={post.body}
                likes={post.likes}
                dislikes={post.dislikes}
                hashtags={post.hashtags}
                color={post.color}
                totalComments={post.totalComments}
              />
            );
          })}
      </PostLayout>
    </>
  );
};

export default Post;
