import PostCard from "./PostCard";
import SortByCard from "./SortByCard";
import PostLayout from "./PostLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useEffect, useState } from "react";

const PostContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [prevSearchQuery, setPrevSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [onSearchMode, setOnSearchMode] = useState(false);
  const [hasMorePost, setHasMorePost] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(40);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchLatestPost = () => {
    // if (onSearchMode) {
    //   fetchSearchPost();
    //   return;
    // }

    const index = pageIndex === 1 ? pageIndex : pageIndex + 1;
    axios
      .get(`${baseUrl}/api/v1/post?page=${index}&limit=${limit}`)
      .then((res) => {
        setIsLoading(false);
        setPosts((prevPosts) =>
          pageIndex === 1 ? res.data.posts : [...prevPosts, ...res.data.posts]
        );
        setIsSuccess(true);
        setPageIndex(index);
        setHasMorePost(res.data.posts.length > 0);
        console.log(
          "success",
          isLoading,
          posts.length,
          isSuccess,
          pageIndex,
          hasMorePost
        );
      })
      .catch(() => {
        setIsLoading(false);
        setPageIndex(1);
        console.log("error");
      });
  };

  const fetchSearchPost = () => {
    if (!searchQuery.trim()) {
      setOnSearchMode(false);
      setPageIndex(1);
      setHasMorePost(true);
    } else {
      setIsLoading(true);
      setPageIndex((prevIndex) => (onSearchMode ? prevIndex : 1));
      setHasMorePost(true);
      const index = onSearchMode ? pageIndex : 1;
      const url = `${baseUrl}/api/v1/post/search?query=${searchQuery}&page=${index}&limit=${limit}`;

      axios
        .get(url)
        .then((res) => {
          const postConcat = onSearchMode
            ? [...posts, ...res.data.posts]
            : res.data.posts;

          setPrevSearchQuery(searchQuery);
          setOnSearchMode(true);
          setPageIndex(index + 1);
          setIsLoading(false);
          setHasMorePost(res.data.posts.length > 0);
          setPosts(postConcat);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchLatestPost();
  }, []);
  return (
    <>
      <SortByCard />
      <div className="h-5" />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchLatestPost}
        hasMore={hasMorePost}
        loader={null}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <PostLayout>
          {isLoading && "Loading ..."}
          {isSuccess &&
            posts.map((post: any) => {
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
      </InfiniteScroll>
    </>
  );
};

export default PostContainer;
