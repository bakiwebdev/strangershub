import Seo from "@/components/SEO";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { queryClient } from "../_app";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "next/router";

const NewPost = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    body: "",
    hashtags: "",
    color: "ffffff",
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  // mutate request
  const { mutate, isLoading: isPostLoading } = useMutation({
    mutationFn: () => {
      return axios.post(`${baseUrl}/api/v1/post`, post);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
      setPost({ title: "", body: "", hashtags: "", color: "ffffff" });
      setDisabled(false);
      router.push("/post");
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
    <>
      <Seo
        templateTitle={"New Po"}
        description={
          "Join us today and let your voice be heard - without ever having to reveal your identity!"
        }
      />
      <div className="h-screen flex flex-col justify-center items-center max-w-7xl mx-auto pt-24 px-10 gap-2 pb-4">
        {/* heading */}
        <input
          style={{
            color: `#${post.color}`,
          }}
          type="text"
          className="w-full bg-transparent rounded-md px-4 py-2 text-3xl font-semibold focus:outline-none mb-1 shadow-md"
          placeholder="New post title here ..."
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />
        {/* color option */}
        <div className="flex w-full flex-wrap gap-3 bg-slate-900/20 rounded-md p-2 mb-2">
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
        {/* Reach Text Editor */}
        <div className="w-full flex-1 overflow-y-scroll">
          <RichTextEditor
            value={post.body}
            onChange={(value: string) => setPost({ ...post, body: value })}
            color={post.color}
          />
        </div>
        {/* hashtag input */}
        <h4 className="w-full text-xs text-gray-400 mx-2">Hashtags</h4>
        <input
          style={{
            border: `1px solid #${post.color}`,
          }}
          type="text"
          className="w-full bg-transparent rounded-md px-4 py-2 text-xs focus:outline-none mb-1 shadow-md"
          placeholder="#joke #amusing #humor etc..."
          value={post.hashtags}
          onChange={(e) => setPost({ ...post, hashtags: e.target.value })}
        />
        {/* publish button  */}
        <button
          disabled={disabled}
          onClick={() => {
            setDisabled(true);
            mutate();
          }}
          className={`w-full flex justify-center items-center px-2 md:px-5 py-2 rounded-md text-slate-800 bg-orange-500 font-semibold ${
            disabled && "cursor-progress"
          }`}
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default NewPost;
