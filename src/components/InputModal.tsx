import { XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "react-modal";

interface InputModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const InputModal = ({ isOpen, onRequestClose }: InputModalProps) => {
  let colorList = [
    "FF0000",
    "008000",
    "0000FF",
    "FFFF00",
    "FF8C00",
    "800080",
    "FF69B4",
    "808080",
    "A52A2A",
    "00FFFF",
    "008080",
    "000080",
    "FF00FF",
    "808000",
    "E6E6FA",
    "800000",
    "40E0D0",
    "FFD700",
    "C0C0C0",
    "4B0082",
  ];
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "none",
          zIndex: 40,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#1E293B",
        },
      }}
      contentLabel="Post input"
    >
      <div className="flex flex-col gap-2">
        {/* close icon */}
        <div className="flex flex-row-reverse mb-4 gap-5 md:gap-40 justify-center items-center">
          <XMarkIcon
            onClick={onRequestClose}
            className="w-6 h-6 cursor-pointer hover:text-red-500"
          />
          <p>Share ideas without the fear of judgment</p>
        </div>
        {/* headline input */}
        <h4 className="text-xs text-gray-400 mx-2">Headline</h4>
        <input
          type="text"
          className=" bg-transparent rounded-full px-4 py-2 text-xs border border-white focus:outline-none mb-1"
          placeholder="Catchy headline e.g The humanity we once knew is gone!"
        />
        {/* body input */}
        <h4 className="text-xs text-gray-400 mx-2">Message</h4>
        <textarea
          cols={5}
          className=" bg-transparent rounded-full px-4 py-2 text-xs border border-white focus:outline-none mb-1"
          placeholder="What's on your mind ?"
        />
        {/* hashtag input */}
        <h4 className="text-xs text-gray-400 mx-2">Hashtags</h4>
        <input
          type="text"
          className=" bg-transparent rounded-full px-4 py-2 text-xs border border-white focus:outline-none mb-1"
          placeholder="#joke #amusing #humor etc..."
        />
        {/* color options */}
        <h4 className="text-xs text-gray-400 mx-2">Colors</h4>
        <div className="flex flex-wrap gap-3 bg-slate-900/20 rounded-md p-2 mb-2">
          {colorList.map((color, idx) => {
            return (
              <span
                key={idx}
                style={{
                  backgroundColor: `#${color}`,
                }}
                className="w-5 h-5 rounded-full cursor-pointer"
              ></span>
            );
          })}
        </div>
        {/* Post button */}
        <button
          onClick={() => {}}
          className="flex justify-center items-center px-2 md:px-5 py-2 rounded-full text-slate-800 bg-orange-500 font-semibold"
        >
          Post
        </button>
      </div>
    </Modal>
  );
};

export default InputModal;
