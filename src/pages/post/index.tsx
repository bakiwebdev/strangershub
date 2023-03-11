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
        </div>
      )}
    </>
  );
};

export default Post;
