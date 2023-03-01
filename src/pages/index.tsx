import Seo from "@/components/SEO";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Seo />
      {/* <div className="max-w-7xl mx-auto pt-24 sm:px-8 md:px-6 mt-16 px-4 sm:mt-24"> */}
      <div className="max-w-7xl mx-auto pt-24 sm:px-8 md:px-6 mt-16 px-4 sm:mt-24 text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Share Your Thoughts</span>{" "}
          <span className="block text-orange-600 xl:inline">
            Anonymously with Strangers Hub
          </span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Strangers Hub is the perfect platform to express yourself without the
          fear of being judged. With our easy-to-use interface, you can
          anonymously share your thoughts, opinions, and stories with the world.
          Join us today and let your voice be heard - without ever having to
          reveal your identity!
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              href={"/post"}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10"
            >
              Join the Conversation
            </Link>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
