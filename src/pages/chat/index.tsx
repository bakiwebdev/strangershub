import Seo from "@/components/SEO";
import { Popover } from "@headlessui/react";
import parse from "html-react-parser";
import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  PaperAirplaneIcon,
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
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const [partnerId, setPartnerId] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout: any = null;

  useEffect(() => {
    if (message && roomId) {
      socket.emit("typing", { roomId });
    }
  }, [message, roomId]);

  useEffect(() => {
    // check if the user is on waiting for to join
    socket.on("waiting", (data) => {
      setIsWaiting(true);
      setIsConnected(false);
    });

    socket.on("stranger_typing", (strangerId) => {
      if (strangerId === partnerId) {
        setIsTyping(true);
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        typingTimeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    });

    // check if the user is on waiting for to join
    socket.on("matched", (data) => {
      setIsWaiting(false);
      setIsConnected(true);
      setRoomId(data.roomId);
      setPartnerId(data.partnerId);
    });
    // partner disconnected
    socket.on("partnerDisconnected", () => {
      socket.emit("leave", roomId);
      setMessages([]);
      setRoomId("");
      socket.emit("join");
      setIsWaiting(true);
    });
  }, [messages, partnerId, roomId]);

  // on receive message
  socket.on("receive_message", (data) => {
    if (partnerId === data.from) {
      setMessages([
        {
          message: data.message,
          from: "stranger",
        },
        ...messages,
      ]);
      setIsTyping(false);
    }
  });

  // get total strangers length
  socket.on("total_waiting_strangers", (data) => {});

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setMessages([
      {
        message,
        from: "you",
      },
      ...messages,
    ]);
    socket.emit("send_message", { roomId, message });
    setMessage("");
  };

  const startRoom = () => {
    if (!roomId) {
      socket.emit("join");
      setIsSearching(true);
    } else if (roomId) {
      socket.emit("leave", roomId);
      setRoomId("");
      setPartnerId("");
      setMessages([]);
      socket.emit("join");
    } else leaveRoom();
  };

  const leaveRoom = () => {
    if (roomId) {
      socket.emit("leave", roomId);
      setIsConnected(false);
      setIsWaiting(false);
      setIsSearching(false);
      setMessages([]);
      setRoomId("");
    }
  };

  return (
    <>
      <Seo
        title="Chat with Strangers - Anonymous Chat Room"
        description="Chat with strangers anonymously in our free chat room. Meet new people and make connections. Start Chatting Now!"
      />
      {/* chat layout */}
      <section className="relative max-w-5xl flex flex-col h-screen max-h-screen overflow-hidden mx-0 md:mx-auto pt-20 pb-10">
        {/* Chat Section */}
        <section className="relative border-b border-slate-600 rounded-md flex-1 w-full max-h-full overflow-hidden">
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
            {isTyping && <p className="px-3 py-1 text-slate-500">typing ...</p>}
            {messages.map((msg, idx) => {
              return (
                <div
                  className={
                    msg.from == "stranger"
                      ? "px-3 py-1 rounded-lg bg-slate-800 text-slate-400 tracking-wide self-start mx-2 max-w-[80%] md:max-w-[60%] overflow-hidden"
                      : "px-3 py-1 rounded-lg bg-green-800/50 text-slate-300 tracking-wide self-end mx-2 max-w-[80%] md:max-w-[60%] overflow-hidden"
                  }
                  key={idx}
                >
                  {parse(
                    msg.message.replace(
                      /(([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#]?[\w-]+)*\/?)/gm,
                      `<a className="text-orange-500 underline underline-offset-1" href="$1" target="_blank">$1</a>`
                    )
                  )}
                </div>
              );
            })}
          </div>
          {/* event display area */}
          <div className="absolute bottom-0 px-2 text-sm rounded-sm w-full flex">
            {!isSearching && (
              <p className="mx-auto py-3 text-sm text-slate-300">
                <span
                  onClick={startRoom}
                  className="text-blue-400 underline cursor-pointer"
                >
                  Start chatting
                </span>{" "}
                with a strangers
              </p>
            )}
            {/* when client is searching but not on waiting list */}
            {!isConnected && isWaiting && !roomId && (
              <p className="mx-auto py-3 text-sm text-slate-300">
                Looking for stranger ...
              </p>
            )}
            {(isConnected || roomId) && (
              <p className="text-slate-600 text-xs">
                You&apos;re now chatting with a random stranger.
              </p>
            )}
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
              <Popover className="relative">
                <Popover.Button className="outline-none flex items-center">
                  <Cog6ToothIcon className="w-6 h-7 text-orange-500" />
                </Popover.Button>
                <Popover.Panel className="absolute bottom-10 left-0 z-10">
                  <div className="rounded-lg bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 flex flex-col items-start gap-4 w-fit py-2 px-3">
                    <Popover.Button className="w-full">
                      <div
                        onClick={startRoom}
                        className="flex gap-3 justify-between items-center text-green-400 hover:text-green-400/50 cursor-pointer"
                      >
                        <p className="text-md text-lg">New</p>
                        <ArrowPathIcon className="w-5 h-5" />
                      </div>
                    </Popover.Button>
                    <Popover.Button className="w-full">
                      <div
                        onClick={leaveRoom}
                        className="flex gap-3 justify-between items-center text-red-400 hover:text-red-400/50 cursor-pointer"
                      >
                        <p className="text-md text-lg">Leave</p>
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      </div>
                    </Popover.Button>
                  </div>
                </Popover.Panel>
              </Popover>
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
