import Link from "next/link";
import React, { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "public/logo/strangers_hub.svg";

const header = () => {
  const router = useRouter();
  const currentPage = router.pathname.split("/")[1];

  return (
    <nav className="w-full mx-auto fixed top-0 right-0 bg-slate-900 z-30 py-2 px-4 duration-200 border-b border-gray-500">
      <div className="px-2 relative max-w-7xl mx-auto flex justify-between place-items-center py-1.5">
        <Link href="/" className="flex w-fit items-center gap-1 md:gap-2">
          <Image
            src={logo}
            alt="SH logo"
            width={40}
            height={40}
            className="h-9 w-9 md:h-10 md:w-10"
          />
          <h3 className="text-md md:text-xl mr-2 font-semibold ml-3 flex justify-center items-center gap-1">
            Strangers Hub
          </h3>
        </Link>
        {/* mobile nav popover */}
        <Popover className="relative block sm:hidden">
          {({ open }) => (
            <>
              <Popover.Button className={"mx-2"}>
                {open ? (
                  <XMarkIcon
                    className="h-7 w-7 text-orange-500"
                    aria-hidden="true"
                  />
                ) : (
                  <Bars3Icon
                    className="h-7 w-7 text-orange-500"
                    aria-hidden="true"
                  />
                )}
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
                  className="absolute top-0 -right-5 mx-auto origin-top-right transform p-2 transition z-10 mt-14 w-screen max-w-sm sm:px-0"
                >
                  <div className="rounded-lg bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-5 pt-5 pb-6">
                      <div className="flex items-center justify-between">
                        <Link
                          href="/"
                          className="flex items-center outline-none"
                        >
                          <Image
                            src={logo}
                            alt="SH logo"
                            width={30}
                            height={30}
                          />
                          <h3 className="text-md mr-2 font-semibold ml-3 flex justify-center items-center gap-1">
                            Strangers Hub
                          </h3>
                        </Link>
                      </div>
                    </div>
                    {/* mobile view link */}
                    <div className="flex flex-col gap-5 px-5 pb-5">
                      <Link href={"/post"}>
                        <Popover.Button
                          className={`px-4 py-1 rounded-full w-full transform transition-all duration-300 text-md ${
                            currentPage === "post"
                              ? "text-orange-500 bg-orange-500/20"
                              : "text-orange-500/60 hover:text-orange-500 hover:bg-orange-500/20"
                          }`}
                        >
                          Strangers Post
                        </Popover.Button>
                      </Link>
                      {/* Live link */}
                      <Link href={"/chat"}>
                        <Popover.Button
                          className={`px-4 py-1 rounded-full w-full transform transition-all duration-300 text-md  ${
                            currentPage === "chat"
                              ? "text-green-500 bg-green-500/20"
                              : "text-green-500/60 hover:text-green-500 hover:bg-green-500/20"
                          }`}
                        >
                          Live Chat
                        </Popover.Button>
                      </Link>
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
            </>
          )}
        </Popover>

        {/* nav links desktop */}
        <div className="sm:flex gap-5 hidden">
          <Link href={"/post"}>
            <h3
              className={` px-4 py-1 rounded-full w-fit transform transition-all duration-300 text-lg ${
                currentPage === "post"
                  ? "text-orange-500 bg-orange-500/20"
                  : "text-orange-500/60 hover:text-orange-500 hover:bg-orange-500/20"
              }`}
            >
              Strangers Post
            </h3>
          </Link>
          {/* Live link */}
          <Link href={"/chat"}>
            <h3
              className={` px-4 py-1 rounded-full w-fit transform transition-all duration-300 text-lg ${
                currentPage === "chat"
                  ? "text-green-500 bg-green-500/20"
                  : "text-green-500/60 hover:text-green-500 hover:bg-green-500/20"
              }`}
            >
              Live Chat
            </h3>
          </Link>
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

export default header;
