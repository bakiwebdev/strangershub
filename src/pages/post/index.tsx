import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowSmallUpIcon } from '@heroicons/react/24/outline';
import InfiniteScroll from 'react-infinite-scroll-component';

import Seo from '@/components/SEO';
import PostCardSkeleton from '@/components/postCardSkeleton';
import PostInputCard from '@/components/PostInputCard';
import PostContainer from '@/components/PostContainer';

const Post = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prevSearchQuery, setPrevSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [onSearchMode, setOnSearchMode] = useState(false);
  const [hasMorePost, setHasMorePost] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(40);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const cardSkeleton = [];

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowButton(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const element = document.getElementById('to-the-top');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchLatestPost = () => {
    if (onSearchMode) {
      fetchSearchPost();
      return;
    }

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
      })
      .catch(() => {
        setIsLoading(false);
        setPageIndex(1);
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
          const postConcat = onSearchMode ? [...posts, ...res.data.posts] : res.data.posts;

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

  useEffect(() => {
    if (!isModalOpen) {
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
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchPost();
  };

  for (let i = 0; i < 12; i++) {
    cardSkeleton.push(<PostCardSkeleton key={i} />);
  }

  return (
    <>
      <Seo
        templateTitle="Share Your Thoughts"
        description="Join us today and let your voice be heard - without ever having to reveal your identity!"
      />
      <span id="to-the-top" />
      <main className="container p-2 mx-auto grid md:grid-cols-5 h-screen max-w-6xl">
        <div>{/* right side */}</div>
        <div className="col-span-3 pt-20">
          <PostInputCard callback={fetchLatestPost} />
          <div className="h-5" />
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchLatestPost}
            hasMore={hasMorePost}
            loader={null}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <PostContainer posts={posts} />
          </InfiniteScroll>
          <button
            onClick={scrollToTop}
            style={{ display: showButton ? 'block' : 'none' }}
            className="fixed bottom-10 bg-orange-500 right-6 md:bottom-20 md:right-14 w-fit h-fit rounded-md z-40"
          >
            <ArrowSmallUpIcon className="w-6 h-6 m-3 text-slate-800" />
          </button>
        </div>
        <div>{/* left side */}</div>
      </main>
    </>
  );
};

export default Post;
