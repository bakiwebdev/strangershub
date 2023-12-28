import InfiniteScroll from "react-infinite-scroll-component";
import PostCardV2 from "./PostCardV2";
import SortByCard from "./SortByCard";
import PostLayout from "./postLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [onSearchMode, setOnSearchMode] = useState<boolean>(false);
  const [hasMorePost, setHasMorePost] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [limit, setLimit] = useState<number>(40);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchLatestPost = () => {
    if (pageIndex === 1) {
      axios
        .get(`${baseUrl}/api/post?page=${pageIndex}&limit=${limit}`)
        .then((res) => {
          setIsLoading(false);
          setPosts(res.data.posts);
          setIsSuccess(true);
        })
        .catch(() => {
          setIsLoading(false);
        });

      setPageIndex(pageIndex + 1);
    } else {
      console.log("excute fetch ", pageIndex, limit);
      axios
        .get(`${baseUrl}/api/post?page=${pageIndex}&limit=${limit}`)
        .then((res) => {
          if (res.data.posts.length === 0) {
            setHasMorePost(false);
          }
          let postConcat = [...posts, ...res.data.posts];
          setPosts(postConcat as any);
        })
        .catch(() => {
          setPageIndex(1);
        });
      setPageIndex(pageIndex + 1);
    }
  };

  useEffect(() => {
    !isModalOpen &&
      axios
        .get(`${baseUrl}/api/post?page=${1}&limit=${limit}`)
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
    <section>
      <SortByCard />
      <div className="h-5" />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchLatestPost}
        hasMore={hasMorePost}
        loader={""}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <PostLayout>
          {isLoading && "loading ..."}
          {isSuccess &&
            posts.map((post: any) => {
              return (
                <PostCardV2
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
      </InfiniteScroll>
    </section>
  );
};

export default PostContainer;
