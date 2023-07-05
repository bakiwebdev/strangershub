import PostCard from "./PostCard";
import SortByCard from "./SortByCard";
import PostLayout from "./PostLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(40);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { isLoading, error, data } = useQuery({
    queryKey: ["postData"],
    queryFn: () =>
      fetch(`${baseUrl}/api/v1/post?page=${pageIndex}&limit=${limit}`).then(
        (res) => res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <SortByCard />
      <div className="h-5" />
      <PostLayout>
        {data.posts.map((post: any) => {
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
