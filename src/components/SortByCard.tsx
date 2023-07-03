import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Tippy from "@tippyjs/react";

const SortByCard = () => {
  return (
    <div className="w-4/2 mx-auto flex justify-center items-center gap-2">
      <hr className="border-0 flex-1 h-[1px] bg-slate-700" />
      <Tippy
        interactive={true}
        placement="bottom-end"
        trigger="click"
        content={
          <ul className="w-32 h-fit flex flex-col gap-3">
            <li className="cursor-pointer py-1 px-2 rounded-md text-slate-200">
              Recent
            </li>
          </ul>
        }
      >
        <button className="text-sm text-slate-400 flex justify-center items-center gap-1">
          sort by:{" "}
          <span className="text-orange-500 font-semibold flex justify-center items-center gap-1">
            Recent <ChevronDownIcon className="w-4 h-4" />{" "}
          </span>
        </button>
      </Tippy>
    </div>
  );
};

export default SortByCard;
