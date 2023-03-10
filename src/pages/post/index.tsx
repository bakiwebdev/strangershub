import Seo from "@/components/SEO";
import PostFilter from "@/components/postFilter";
import PostCard from "@/components/postCard";
import PostCardSkeleton from "@/components/postCardSkeleton";
import PostLayout from "@/components/postLayout";
import { Variants, motion } from "framer-motion";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
      {isLoading && (
        <div className="max-w-7xl mx-auto pt-28 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {cardSkeleton}
        </div>
      )}
      {isSuccess && (
        <div className="max-w-7xl mx-auto pt-28 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {data.posts.map((post: any) => {
            return (
              <PostCard
                key={post._id}
                id={post._id}
                date={post.date}
                time={post.time}
                title={post.title}
                body={post.body}
                likes={post.likes}
                dislikes={post.dislikes}
                hashtags={post.hashtags}
                color={post.color}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Post;
