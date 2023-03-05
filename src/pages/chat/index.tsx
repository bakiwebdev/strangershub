import Seo from "@/components/SEO";
import {
  PaperAirplaneIcon,
  RectangleGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const socket = io(baseUrl || "http://localhost:5000");

interface MessageProps {
  message: string;
  from: "stranger" | "you";
}

const Post = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [message, setMessage] = useState<string>("");
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // When a new message is received, add it to the state
      setMessages([
        {
          message: data.message,
          from: "stranger",
        },
        ...messages,
      ]);
    });
  }, [messages]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setMessages([
      {
        message,
        from: "you",
      },
      ...messages,
    ]);
    socket.emit("send_message", { message });
    setMessage("");
  };

  return (
    <>
      <Seo />
      {/* chat layout */}
      <section className="relative max-w-5xl flex flex-col h-screen max-h-screen overflow-hidden mx-0 md:mx-auto pt-20 pb-10">
        {/* Chat Section */}
        <section className="border-b border-slate-600 rounded-md flex-1 w-full max-h-full overflow-hidden">
          {/* welcome message */}
          {showWelcomeMessage && (
            <div className="fixed z-10 w-full max-w-5xl h-fit flex flex-col gap-2 px-2 md:px-10 py-2 bg-gradient-to-r from-green-500/10 to-slate-900">
              <div className="flex justify-between">
                <h3 className="text-green-500 text-sm md:text-base">
                  Welcome to Strangers Hub Live Chat
                </h3>

                <XMarkIcon
                  onClick={() => setShowWelcomeMessage(false)}
                  className="h-6 w-6 text-orange-500 cursor-pointer"
                  aria-hidden="true"
                />
              </div>
              <p className="text-xs md:text-sm text-green-300/80 tracking-wide">
                Welcome to our anonymous live chat where you can connect with
                strangers from around the world. We kindly request that you
                maintain a respectful and responsible attitude towards your
                fellow users, and help us create a warm and friendly atmosphere
                for all to enjoy.
              </p>
            </div>
          )}
          {/* conversation list */}
          <div className="h-full max-h-full flex flex-col-reverse px-2 py-2 gap-2 pb-10 overflow-y-auto">
            {messages.map((msg, idx) => {
              return (
                <div
                  className={
                    msg.from == "stranger"
                      ? "px-3 py-1 rounded-lg bg-slate-800 text-slate-400 tracking-wide self-start mx-2 max-w-[80%] md:max-w-[60%]"
                      : "px-3 py-1 rounded-lg bg-green-800 text-slate-300 tracking-wide self-end mx-2 max-w-[80%] md:max-w-[60%]"
                  }
                  key={idx}
                >
                  {msg.message}
                </div>
              );
            })}
          </div>
        </section>
        {/* message input area */}
        <div className="flex gap-2 flex-col">
          <form
            onSubmit={(e) => handleSendMessage(e)}
            id="comment-input-area"
            className="mt-2 flex gap-1 justify-start items-center px-2 lg:px-5 py-2 rounded-md bg-slate-700/20 mx-2 lg:mx-0"
          >
            <div className="flex justify-center items-center pr-2 border-r border-slate-500">
              <RectangleGroupIcon className="w-6 h-7 text-slate-400" />
            </div>
            <input
              type="text"
              required={true}
              maxLength={500}
              className="flex-1 w-full bg-transparent focus:border-none px-4 ring-0 focus:ring-0 focus:outline-none"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="border-l border-slate-500 w-fit flex sm:flex-none justify-center items-center gap-3 cursor-pointer pl-4 lg:px-4 p-2"
            >
              <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
              <p className="hidden lg:block">Send</p>
            </button>
          </form>
          <p className="mx-2 px-2 text-xs text-slate-400">
            Welcome to Strangers Hub, a safe and natural platform to anonymously
            connect with users from around the world. We value your feedback as
            we continue to enhance your experience.
          </p>
        </div>
      </section>
    </>
  );
};

export default Post;
