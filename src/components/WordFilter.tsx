import { PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const WordFilter = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
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
          onClick={() => setIsOpen(true)}
          className="flex justify-center items-center px-2 md:px-5 py-2 rounded-full text-slate-800 bg-orange-500 font-semibold"
        >
          <span className="hidden md:block">Have something to say ?</span>
          <PencilIcon className="w-5 h-5 block md:hidden" />
        </button>
      </div>
      {/* modal */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
};

export default WordFilter;
