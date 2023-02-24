import CommentCard from "@/components/CommentCard";
import {
  ArrowLeftIcon,
  GlobeEuropeAfricaIcon,
  HandThumbDownIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const Word = () => {
  return (
    <section className="max-w-4xl mx-auto pt-20 md:pt-28 px-4 sm:px-8 md:px-6 mb-10 flex flex-col gap-4 relative">
      {/* Back icon */}
      <div className="flex gap-3 justify-center items-center w-fit float-left text-green-500 px-4 py-2 rounded-full bg-green-500/10 cursor-pointer hover:bg-green-500/20 transition translate">
        <ArrowLeftIcon className="w-5 h-5" />
        <p className="text-sm">Back</p>
      </div>
      {/* posted time zone & reaction*/}
      <div className="flex justify-between flex-wrap gap-2">
        {/* posted time */}
        <div className="flex justify-center items-center gap-2 w-fit my-2 min-w-fit">
          <GlobeEuropeAfricaIcon className="w-5 h-5 text-gray-100" />
          <p className="text-md text-gray-400">today - 12:00pm</p>
        </div>
        {/* reactions */}
        <div
          onClick={() => console.log("reaction button clicked")}
          className="flex justify-between gap-10 mt-2 px-4 sm:px-3 md:px-2 z-10"
        >
          {/* heart icon */}
          <div className="group flex gap-1 text-red-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
            <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-red-500/10 transform transition-all ease-in-out duration-500">
              <HeartIcon className="w-4 h-4" />
            </div>
            <p className="font-mono text-xs font-light">100</p>
          </div>
          {/* thumbs down icon */}
          <div className="group flex gap-1 text-orange-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
            <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-orange-500/10 transform transition-all ease-in-out duration-500">
              <HandThumbDownIcon className="w-4 h-4" />
            </div>
            <p className="font-mono text-xs font-light">500</p>
          </div>
          {/* share icon */}
          <div className="group flex gap-1 text-green-500 transform transition-all ease-in-out duration-500 items-center cursor-pointer">
            <div className="flex justify-center items-center p-1 rounded-full group-hover:bg-green-500/10 transform transition-all ease-in-out duration-500">
              <ShareIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      {/* word heading */}
      <div className="flex justify-center items-center my-4">
        <h3 className="font-semibold text-xl sm:text-2xl md:text-4xl first-letter:capitalize tracking-wider leading-snug">
          flex gap-3 justify-center items-center w-fit float-left text-green-500
          px-4 py-2 rounded-full bg-green-500/10 cursor-pointer
          hover:bg-green-500/20 transition translate
        </h3>
      </div>
      {/* word body */}
      <div className="flex justify-start">
        <pre className="flex text-sm sm:text-base md:text-lg first-letter:capitalize whitespace-pre-wrap leading-normal tracking-wide">
          flex gap-3 justify-center items-center w-fit float-left text-green-500
          px-4 py-2 rounded-full bg-green-500/10 cursor-pointer
          hover:bg-green-500/20 transition translateflex gap-3 justify-center
          items-center w-fit float-left text-green-500 px-4 py-2 rounded-full
          bg-green-500/10 cursor-pointer hover:bg-green-500/20 transition
          translateflex gap-3 justify-center items-center w-fit float-left
          text-green-500 px-4 py-2 rounded-full bg-green-500/10 cursor-pointer
          hover:bg-green-500/20 transition translate
        </pre>
      </div>
      {/* hash tag lists */}
      <div className="flex justify-start items-center my-4 rounded-full gap-2 flex-wrap">
        {/* single hash tag */}
        <span className="py-1 px-3 rounded-full bg-blue-500/10 text-sm text-blue-500">
          #topG
        </span>
        <span className="py-1 px-3 rounded-full bg-blue-500/10 text-sm text-blue-500">
          #topG
        </span>
        <span className="py-1 px-3 rounded-full bg-blue-500/10 text-sm text-blue-500">
          #topG
        </span>
        <span className="py-1 px-3 rounded-full bg-blue-500/10 text-sm text-blue-500">
          #topG
        </span>
        <span className="py-1 px-3 rounded-full bg-blue-500/10 text-sm text-blue-500">
          #topG
        </span>
      </div>
      {/* comment section */}
      <div className="flex flex-col my-5 sticky top-40 max-h-[80vh]">
        <div className="mb-2 flex justify-start items-center px-5 py-2 rounded-full bg-slate-700/20">
          <h3>Comments</h3>
        </div>
        {/* list of comments */}
        <div className="flex flex-col gap-4 px-2 sm:px-4 md:px-8 py-5 overflow-y-scroll">
          {/* if no comment is found */}
          <p className="text-center text-gray-600">No comment</p>

          {/* if there is a comment */}
          <CommentCard />
        </div>
        {/* comment input area */}
        <div className="mt-2 flex flex-wrap gap-1 justify-start items-center px-5 py-2 rounded-md bg-slate-700/20">
          <input
            type="text"
            maxLength={400}
            className="flex-1 bg-transparent focus:border-none px-4 ring-0 focus:ring-0 focus:outline-none"
            placeholder="What's your thought ?"
          />
          <div className="flex flex-1 sm:flex-none justify-center items-center gap-3 cursor-pointer hover:bg-slate-600/20 px-4 py-2 rounded-full">
            <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
            <p>Send</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Word;
