import { useEffect } from "react";
import { ArrowSmallUpIcon } from "@heroicons/react/24/outline";

import Seo from "@/components/SEO";
import PostInputCard from "@/components/PostInputCard";
import PostContainer from "@/components/PostContainer";

const Post = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const element = document.getElementById("to-the-top");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Seo
        templateTitle="Share Your Thoughts"
        description="Join us today and let your voice be heard - without ever having to reveal your identity!"
      />
      <span id="to-the-top" />
      <main className="container p-2 mx-auto grid md:grid-cols-5 h-screen max-w-6xl">
        <div>{/* right side */}</div>
        <div className="col-span-3 pt-20 relative">
          <PostInputCard />
          <div className="h-5" />
          <PostContainer />
          <button
            onClick={scrollToTop}
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
