import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";

interface InputModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const InputModal = ({ isOpen, onRequestClose }: InputModalProps) => {
  const [post, setPost] = useState({
    title: "",
    body: "",
    hashtags: "",
    color: "ffffff",
  });

  // post submit
  const handlePostSubmit = async () => {
    try {
      await axios.post(`https://strangers-hub.onrender.com/api/v1/post`, post);
      // if success remove
      setPost({ title: "", body: "", hashtags: "", color: "ffffff" });
      onRequestClose();
    } catch (error) {
      // Handle the error
    }
  };
  let colorList = [
    "ffffff",
    "2BAE66FF",
    "EDFF00FF",
    "00A4CCFF",
    "FFA177FF",
    "A2A2A1FF",
    "F9A12EFF",
    "FE4773",
    "933DC9",
    "61b59f",
    "F63CCA",
    "00ED00",
    "EC2A1C",
    "FF7C00",
    "8FBC8F",
    "FF6347",
    "FF8C00",
    "008B8B",
    "B8860B",
    "9932CC",
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
      <div className="flex flex-col gap-3">
        {/* close icon */}
        <div className="flex flex-row-reverse mb-4 gap-5 md:gap-40 justify-between items-center">
          <XMarkIcon
            onClick={onRequestClose}
            className="w-6 h-6 cursor-pointer hover:text-red-500"
          />
          <p>Share ideas without the fear of judgment</p>
        </div>
        {/* headline input */}
        <h4 className="text-xs text-gray-400 mx-2">Headline</h4>
        <input
          style={{
            border: `1px solid #${post.color}`,
          }}
          type="text"
          className="bg-transparent rounded-full px-4 py-2 text-xs focus:outline-none mb-1 shadow-md"
          placeholder="Catchy headline e.g The humanity we once knew is gone!"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        {/* body input */}
        <h4 className="text-xs text-gray-400 mx-2">Message</h4>
        <textarea
          style={{
            border: `1px solid #${post.color}`,
          }}
          cols={5}
          className="bg-transparent rounded-full px-4 py-2 text-xs focus:outline-none mb-1 shadow-md"
          placeholder="What's on your mind ?"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
        {/* hashtag input */}
        <h4 className="text-xs text-gray-400 mx-2">Hashtags</h4>
        <input
          style={{
            border: `1px solid #${post.color}`,
          }}
          type="text"
          className="bg-transparent rounded-full px-4 py-2 text-xs focus:outline-none mb-1 shadow-md"
          placeholder="#joke #amusing #humor etc..."
          value={post.hashtags}
          onChange={(e) => setPost({ ...post, hashtags: e.target.value })}
        />
        {/* color options */}
        <h4 className="text-xs text-gray-400 mx-2">Colors</h4>
        <div className="flex flex-wrap gap-3 bg-slate-900/20 rounded-md p-2 mb-2">
          {colorList.map((color, idx) => {
            return (
              <span
                onClick={() => setPost({ ...post, color })}
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
          onClick={handlePostSubmit}
          className="flex justify-center items-center px-2 md:px-5 py-2 rounded-full text-slate-800 bg-orange-500 font-semibold"
        >
          Post
        </button>
      </div>
    </Modal>
  );
};

export default InputModal;
