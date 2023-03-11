import Seo from "@/components/SEO";
import { Popover } from "@headlessui/react";
import parse from "html-react-parser";
import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import socket from "@/server/socket";

interface MessageProps {
  message: string;
  from: "stranger" | "you";
}

const Post = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [start, setStart] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [matched, setMatched] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const [strangerId, setStrangerId] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout: any = null;

  const resetDefaultState = () => {
    setStart(true);
    setMessages([]);
    setMessage("");
    setIsWaiting(false);
    setMatched(false);
    setRoomId("");
    setStrangerId("");
  };

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onWaiting() {
      console.log("waiting ...");
      setIsWaiting(true);
    }

    function onMatched(data: any) {
      console.log("matched with ", data.strangerId);
      console.log("on room ", data.roomId);
      setIsWaiting(false);
      setMatched(true); // => matched with stranger
      setRoomId(data.roomId); // => set room id
      setStrangerId(data.strangerId); // => set stranger id
    }

    function onTyping(data: any) {
      console.log(data, " is typing ...");
      setIsTyping(true);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }

    function onStrangerDisconnected() {
      console.log("partner disconnected ");
      socket.emit("leaveRoom", roomId); // => leave the room
      socket.emit("join"); // => request for other chat automatically
      // reset state like isMatched, roomId, strangersId
      setMatched(false);
      setRoomId("");
      setStrangerId("");
      setMessages([]);
    }

    function onMessage(data: any) {
      if (strangerId == data.from) {
        console.log("message received ", data.message);
        setMessages((prevState) => [
          {
            message: data.message,
            from: "stranger",
          },
          ...prevState,
        ]);
      }
      setIsTyping(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("waiting", onWaiting);
    socket.on("matched", onMatched);
    socket.on("typing", onTyping);
    socket.on("strangerDisconnected", onStrangerDisconnected);
    socket.on("receive_message", onMessage);
    // socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("waiting", onWaiting);
      socket.off("matched", onMatched);
      socket.off("typing", onTyping);
      // socket.off("foo", onFooEvent);
    };
  }, []);

  // effect to emit when user is typing
  useEffect(() => {
    if (message) {
      socket.emit("typing", { roomId });
    }
  }, [message, roomId]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setMessages((prevState) => [
      {
        message,
        from: "you",
      },
      ...prevState,
    ]);
    socket.emit("send_message", { roomId, message });
    setMessage("");
  };

  const startChatting = () => {
    if (isConnected) {
      console.log("send join request");
      setStart(true);
      socket.emit("join");
    }
  };

  const newChat = () => {
    if (isConnected) {
      console.log("new chat request");
      setRoomId("");
      socket.emit("leaveRoom", roomId);
      socket.emit("join");
      setIsWaiting(true);
      setMessages([]);
      setMessage("");
    }
  };

  const leaveRoom = () => {
    if (isConnected) {
      console.log("leaving a chat");
      socket.emit("leaveRoom", roomId);
      resetDefaultState();
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
          {!start && (
            <div className="fixed z-10 w-full max-w-5xl h-fit flex flex-col gap-2 px-2 md:px-10 py-2 bg-gradient-to-r from-green-500/10 to-slate-900">
              <div className="flex justify-between">
                <h3 className="text-green-500 text-sm md:text-base">
                  Welcome to Strangers Hub Live Chat
                </h3>
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
          <div className="h-full flex flex-col-reverse px-2 py-2 gap-2 pb-10 overflow-scroll no-scrollbar">
            {isTyping && <p className="px-3 py-1 text-slate-500">typing ...</p>}
            {messages.map((msg, idx) => {
              return (
                <div
                  className={
                    msg.from == "stranger"
                      ? "flex bg-slate-800 text-slate-400 self-start rounded-md mx-2 max-w-[80%]"
                      : "flex bg-green-800/50 text-slate-300 self-end rounded-md mx-2 max-w-[80%]"
                  }
                  key={idx}
                >
                  <p className=" tracking-wide px-3 py-1 w-fit">
                    {parse(
                      msg.message.replace(
                        /(([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#]?[\w-]+)*\/?)/gm,
                        '<span><a className="text-orange-500 underline underline-offset-1" href="$1" target="_blank">$1</a></span>'
                      )
                    )}
                  </p>
                </div>
              );
            })}
            <div className="absolute bottom-0 px-2 text-sm rounded-sm w-full flex">
              {!start && (
                <p
                  onClick={startChatting}
                  className="cursor-pointer mx-auto tracking-wide py-2 text-sm text-slate-400 px-3 rounded-md border border-green-500/50 mb-4"
                >
                  Start Chatting
                </p>
              )}
              {/* connection indicator */}
              <span
                className={`absolute bottom-0 right-0 mx-5 my-3 ${
                  isConnected ? "bg-green-700" : "bg-red-700"
                } w-2 h-2 rounded-full`}
              ></span>
              {isConnected && isWaiting && (
                <p className="mx-auto py-3 text-sm text-slate-300">
                  Looking for stranger ...
                </p>
              )}
              {isConnected && matched && (
                <p className="text-slate-600 text-xs">
                  Connected with{" "}
                  <span className="text-green-500">{strangerId}.</span>
                </p>
              )}
            </div>
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
                        onClick={newChat}
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
