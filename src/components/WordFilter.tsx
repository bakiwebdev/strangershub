import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import InputModal from "./InputModal";

const WordFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="fixed w-full mx-auto py-2 top-0 z-20 pt-20 bg-slate-900 border-b border-gray-500">
      {/* filter option */}
      <div className="px-2 relative max-w-7xl mx-auto flex justify-between">
        {/* filter options */}
        <div></div>
        {/* post words */}
        <button
          onClick={openModal}
          className="flex justify-center items-center px-2 md:px-5 py-2 rounded-full text-slate-800 bg-orange-500 font-semibold"
        >
          <span className="hidden md:block">Have something to say ?</span>
          <PencilIcon className="w-5 h-5 block md:hidden" />
        </button>
      </div>
      {/* modal */}
      <InputModal isOpen={isOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default WordFilter;
