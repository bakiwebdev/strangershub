import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";

interface commentProps {
  date: string;
  time: string;
  body: string;
}

const CommentCard = ({ date, time, body }: commentProps) => {
  return (
    <div className="h-fit bg-slate-800/20 rounded-lg px-4 py-2 text-gray-400">
      <div className="my-2 flex justify-center items-center gap-2 w-fit bg-orange-500/10 text-orange-500 px-2 py-1 rounded-full">
        {/* actual data */}
        <p className="text-xs ">
          {date} - {time}
        </p>
        <GlobeEuropeAfricaIcon className="w-3 h-3 " />
      </div>
      <pre className="flex text-sm md:text-base first-letter:capitalize whitespace-pre-wrap">
        {body}
      </pre>
    </div>
  );
};

export default CommentCard;
