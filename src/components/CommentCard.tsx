import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";

const CommentCard = () => {
  return (
    <div className="h-fit bg-slate-800/20 rounded-lg px-4 py-2 text-gray-400">
      <div className="my-2 flex justify-center items-center gap-2 w-fit bg-orange-500/10 text-orange-500 px-2 py-1 rounded-full">
        {/* actual data */}
        <p className="text-xs ">today - 12:00pm</p>
        <GlobeEuropeAfricaIcon className="w-3 h-3 " />
      </div>
      <pre className="flex text-sm md:text-base first-letter:capitalize whitespace-pre-wrap">
        items-center w-fit float-left text-green-500 px-4 py-2 rounded-full
        bg-green-500/10 cursor-pointer hover:bg-green-500/20 transition
        translateflex gap-3 justify-center items-center w-fit float-left
        text-green-500 px-4 py-2 rounded-full bg-green-500/10 cursor-pointer
        hover:bg-green-500/20 transition translate
      </pre>
    </div>
  );
};

export default CommentCard;
