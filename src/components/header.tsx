import Link from "next/link";
import React, { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const router = useRouter();
  const currentPage = router.pathname.split("/")[1];

  return (
    <nav className="w-full mx-auto fixed bg-slate-900 z-30 py-2 md:px-0 duration-200 border-b border-gray-500">
      <div className="px-2 relative max-w-7xl mx-auto flex justify-between place-items-center py-1.5">
        <Link href="/">
          <h3 className="text-xl mr-2 font-semibold ml-3 flex justify-center items-center gap-1">
            Strangers
            <span className="bg-orange-500 px-2 py-1 rounded-md text-slate-900">
              hub
            </span>
          </h3>
        </Link>
        <Popover className="relative block sm:hidden">
          <Popover.Button className={"mx-2"}>
            <Bars3Icon className="h-7 w-67" aria-hidden="true" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute top-0 right-0 mx-auto origin-top-right transform p-2 transition z-10 mt-14 w-screen max-w-sm px-4 sm:px-0"
            >
              <div className="rounded-lg bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                      <h3 className="text-md mr-2 font-semibold ml-3 flex justify-center items-center gap-1">
                        Strangers
                        <span className="bg-orange-500 px-2 py-1 rounded-md text-slate-900">
                          hub
                        </span>
                      </h3>
                    </Link>
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-slate-900 p-2 text-green-500 hover:bg-slate-900/20 hover:text-green-500/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-none">
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                {/* mobile view link */}
                <div className="flex flex-col gap-5 px-5 pb-5">
                  <Link href={"/strangersPost"}>
                    <h3
                      className={`px-4 py-1 rounded-full w-full transform transition-all duration-300 text-md ${
                        currentPage === "words"
                          ? "text-orange-500 bg-orange-500/20"
                          : "text-orange-500/60 hover:text-orange-500 hover:bg-orange-500/20"
                      }`}
                    >
                      Strangers Post
                    </h3>
                  </Link>
                  {/* Live link */}
                  {/* <Link href={"/chat"}>
                    <h3
                      className={`px-4 py-1 rounded-full w-full transform transition-all duration-300 text-md  ${
                        currentPage === "chat"
                          ? "text-red-500 bg-red-500/20"
                          : "text-red-500/60 hover:text-red-500 hover:bg-red-500/20"
                      }`}
                    >
                      Live Chat
                    </h3>
                  </Link> */}
                  {/* Room link */}
                  {/* <Link href={"/rooms"}>
                    <h3
                      className={`px-4 py-1 rounded-full w-full transform transition-all duration-300 text-md ${
                        currentPage === "rooms"
                          ? "text-yellow-500 bg-yellow-500/20"
                          : "text-yellow-500/60 hover:text-yellow-500 hover:bg-yellow-500/20"
                      }`}
                    >
                      Rooms
                    </h3>
                  </Link> */}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        {/* nav links */}
        <div className="sm:flex gap-5 hidden">
          <Link href={"/strangersPost"}>
            <h3
              className={` px-4 py-1 rounded-full w-fit transform transition-all duration-300 text-lg ${
                currentPage === "strangersPost"
                  ? "text-orange-500 bg-orange-500/20"
                  : "text-orange-500/60 hover:text-orange-500 hover:bg-orange-500/20"
              }`}
            >
              Strangers Post
            </h3>
          </Link>
          {/* Live link */}
          {/* <Link href={"/chat"}>
            <h3
              className={` px-4 py-1 rounded-full w-fit transform transition-all duration-300 text-lg ${
                currentPage === "chat"
                  ? "text-red-500 bg-red-500/20"
                  : "text-red-500/60 hover:text-red-500 hover:bg-red-500/20"
              }`}
            >
              Live Chat
            </h3>
          </Link> */}
          {/* Room link */}
          {/* <Link href={"/rooms"}>
            <h3
              className={` px-4 py-1 rounded-full w-fit transform transition-all duration-300 text-lg ${
                currentPage === "rooms"
                  ? "text-yellow-500 bg-yellow-500/20"
                  : "text-yellow-500/60 hover:text-yellow-500 hover:bg-yellow-500/20"
              }`}
            >
              Rooms
            </h3>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
