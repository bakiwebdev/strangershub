import PostCardV2 from "./PostCardV2";
import SortByCard from "./SortByCard";
import PostLayout from "./postLayout";
import axios from "axios";
import { useEffect, useState } from "react";

const PostContainer = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [prevSearchQuery, setPrevSearchQuery] = useState<string>("");
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
    if (onSearchMode) {
      fetchSearchPost();
      return;
    }
    if (pageIndex === 1) {
      axios
        .get(`${baseUrl}/api/v1/post?page=${pageIndex}&limit=${limit}`)
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
      axios
        .get(`${baseUrl}/api/v1/post?page=${pageIndex}&limit=${limit}`)
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

  const fetchSearchPost = () => {
    if (!searchQuery.trim()) {
      setOnSearchMode(false);
      const index = 1;
      setHasMorePost(true);
      axios
        .get(`${baseUrl}/api/v1/post?page=${index}&limit=${limit}`)
        .then((res) => {
          setIsLoading(false);
          setPosts(res.data.posts);
          setIsSuccess(true);
          setPageIndex(index + 1);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      setPageIndex(1);
      setHasMorePost(true);
      let index = onSearchMode ? pageIndex : 1;
      prevSearchQuery != searchQuery && (index = 1);

      axios
        .get(
          `${baseUrl}/api/v1/post/search?query=${searchQuery}&page=${index}&limit=${limit}`
        )
        .then((res) => {
          let postConcat = onSearchMode
            ? [...posts, ...res.data.posts]
            : res.data.posts;

          prevSearchQuery != searchQuery && (postConcat = res.data.posts);
          setPrevSearchQuery(searchQuery);
          setOnSearchMode(true);
          setPageIndex(index + 1);
          setIsLoading(false);
          if (res.data.posts.length === 0) {
            setHasMorePost(false);
          }
          setPosts(postConcat as any);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchLatestPost();
  }, []);

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
  }, [isModalOpen]);

  return (
    <section>
      <SortByCard />
      <div className="h-5" />
      <PostLayout>
        {isLoading && "loading ..."}
        {isSuccess &&
          posts.map((post: any, idx: number) => {
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
    </section>
  );
};

export default PostContainer;
