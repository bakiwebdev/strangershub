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
    <div className="fixed bottom-10 right-6 md:bottom-20 md:right-14 w-fit h-fit rounded z-40">
      <button
        onClick={openModal}
        className="flex justify-center items-center px-2 md:px-5 py-2 rounded-full text-slate-800 bg-orange-500 font-semibold"
      >
        <span className="hidden md:block">Have something to say ?</span>
        <PencilIcon className="w-7 h-7 block md:hidden" />
      </button>
      <InputModal isOpen={isOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default WordFilter;
