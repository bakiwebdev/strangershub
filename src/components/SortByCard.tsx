import { ChevronDownIcon } from "@heroicons/react/24/outline";

const SortByCard = () => {
  return (
    <div className="w-4/2 mx-auto flex justify-center items-center gap-2">
      <hr className="border-0 flex-1 h-[1px] bg-slate-700" />
      <button className="text-sm text-slate-400 flex justify-center items-center gap-1">
        sort by:{" "}
        <span className="text-orange-500 font-semibold flex justify-center items-center gap-1">
          Recent <ChevronDownIcon className="w-4 h-4" />{" "}
        </span>
      </button>
    </div>
  );
};

export default SortByCard;
