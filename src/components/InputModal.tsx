import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/pages/_app";

interface InputModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const InputModal = ({ isOpen, onRequestClose }: InputModalProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [post, setPost] = useState({
    title: "",
    body: "",
    hashtags: "",
    color: "ffffff",
  });

  // mutate request
  const { mutate, isLoading: isPostLoading } = useMutation({
    mutationFn: () => {
      return axios.post(`${baseUrl}/api/v1/post`, post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      setPost({ title: "", body: "", hashtags: "", color: "ffffff" });
      onRequestClose();
    },
  });

  let colorList = [
    "ffffff",
    "2BAE66",
    "EDFF00",
    "00A4CC",
    "FFA177",
    "A2A2A1",
    "F9A12E",
    "FE4773",
    "933DC9",
    "61b59f",
    "F63CCA",
    "00ED00",
    "EC2A1C",
    "FF7C00",
    "8FBC8F",
    "FF6347",
  ];
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: "none",
          zIndex: 40,
          marginRight: 15,
          marginLeft: 15,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#1E293B",
          border: `1px solid #${post.color}`,
        },
      }}
      contentLabel="Post input"
    >
      <div className="flex flex-col gap-3">
        {/* close icon */}
        <div className="flex flex-row-reverse mb-4 gap-5 md:gap-40 justify-between items-center">
          <div
            onClick={onRequestClose}
            className="cursor-pointer inline-flex items-center justify-center rounded-md bg-slate-800 p-2  hover:bg-slate-900/20 hover:text-green-500/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-none"
          >
            <XMarkIcon
              className="h-7 w-7 text-orange-500 cursor-pointer"
              aria-hidden="true"
            />
          </div>
          <p>Share ideas without the fear of judgment</p>
        </div>
        {/* headline input */}
        <h4 className="text-xs text-gray-400 mx-2">Headline</h4>
        <input
          style={{
            border: `1px solid #${post.color}`,
          }}
          type="text"
          className="bg-transparent rounded-md px-4 py-2 text-xs focus:outline-none mb-1 shadow-md"
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
          cols={6}
          className="bg-transparent rounded-md px-4 py-3 text-xs focus:outline-none mb-1 shadow-md"
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
          className="bg-transparent rounded-md px-4 py-2 text-xs focus:outline-none mb-1 shadow-md"
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
          onClick={() => mutate()}
          className="flex justify-center items-center px-2 md:px-5 py-2 rounded-full text-slate-800 bg-orange-500 font-semibold"
        >
          Post
        </button>
      </div>
    </Modal>
  );
};

export default InputModal;
