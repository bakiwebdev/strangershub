import PostCard from "./PostCard";
import SortByCard from "./SortByCard";
import PostLayout from "./PostLayout";
import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const PostContainer = () => {
  const [posts, setPosts] = useState([]);

  const { isLoading, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios.get(`${baseUrl}/api/v1/post?page=1&limit=150`).then((res) => {
        setPosts(res.data.posts);
        return res;
      }),
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{`An error has occurred: ${error}`}</p>;

  return (
    <>
      <SortByCard />
      <div className="h-5" />
      <PostLayout>
        {posts.map((post: any) => {
          return (
            <PostCard
              key={post._id}
              id={post._id}
              date={post.date}
              time={post.time}
              body={post.body}
              color={post.color}
              likes={post.likes}
              dislikes={post.dislikes}
              hashtags={post.hashtags}
              totalComments={post.totalComments}
            />
          );
        })}
      </PostLayout>
    </>
  );
};

export default PostContainer;
