import Seo from "@/components/SEO";
import PostCard from "@/components/postCard";
import PostCardSkeleton from "@/components/postCardSkeleton";
import PostLayout from "@/components/postLayout";
import axios from "axios";
import {
  ArrowSmallUpIcon,
  BarsArrowDownIcon,
  MagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import PostCardV2 from "@/components/PostCardV2";

const Post = () => {
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
  const cardSkeleton = [];

  for (let i = 0; i < 12; i++) {
    cardSkeleton.push(<PostCardSkeleton key={i} />);
  }

  const isBrowser = () => typeof window !== "undefined";

  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  // on search submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchSearchPost();
  };

  return (
    <>
      <Seo
        templateTitle={"Share Your Thoughts"}
        description={
          "Join us today and let your voice be heard - without ever having to reveal your identity!"
        }
      />
      <main className="container mx-auto grid grid-cols-4 h-screen max-w-7xl">
        <div className="">gird 1</div>
        <div className="bg-slate-800 bg-opacity-10 col-span-2 pt-40">
          {/* post card layout */}
          <PostCardV2 />
        </div>
        <div className="">gird 3</div>
      </main>
      {/* <InfiniteScroll
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
          {isLoading && cardSkeleton}
          {isSuccess &&
            posts.map((post: any, idx: number) => {
              return (
                // <PostCard
                //   key={post._id + idx}
                //   id={post._id}
                //   date={post.date}
                //   time={post.time}
                //   title={post.title}
                //   body={post.body}
                //   likes={post.likes}
                //   dislikes={post.dislikes}
                //   hashtags={post.hashtags}
                //   color={post.color}
                //   totalComments={post.totalComments}
                // />
                <PostCardV2 key={post._id + idx} />
              );
            })}
        </PostLayout>
      </InfiniteScroll> */}
      {/* scroll to the top button */}
      {/* <button
        onClick={scrollToTop}
        className="fixed bg-orange-500 bottom-10 right-6 md:bottom-20 md:right-14 w-fit h-fit rounded-md z-40"
      >
        <ArrowSmallUpIcon className="w-6 h-6 m-3 text-slate-800" />
      </button> */}
    </>
  );
};

export default Post;
