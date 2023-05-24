import Link from "next/link";
import React, { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "public/logo/strangers_hub.svg";
import NavLink from "./NavLink";

const Header = () => {
  const router = useRouter();
  const currentPage = router.pathname.split("/")[1];

  return (
    <nav className="w-full mx-auto fixed top-0 right-0 bg-slate-800 border-b border-slate-700 z-30 py-2 px-4 duration-200">
      <div className="container w-full mx-auto grid grid-cols-4 max-w-7xl">
        <Link href="/" className="flex w-fit items-center gap-1 md:gap-2">
          <Image
            src={logo}
            alt="SH logo"
            width={40}
            height={40}
            className="h-9 w-9 md:h-10 md:w-10"
          />
        </Link>
        {/* menu */}
        <section className="col-span-2 flex justify-center">
          <div className="w-full max-w-xl flex justify-start items-center">
            <NavLink
              href="/post"
              name="Home"
              icon={<HomeIcon className="w-5 h-5" />}
            />
          </div>
        </section>
        {/* profile and logout */}
        <section className="flex justify-end items-center gap-2">
          {/* profile pic */}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/strangers_hub_post.png"
              alt="profile-pic"
              width={50}
              height={50}
              className="object-cover h-full w-full"
            />
          </div>
          {/* profile name */}
          <p>Stranger</p>
          <span className="h-4/5 border border-slate-500" />
          {/* logout icon */}
          <div className="w-8 h-8 rounded-full hover:bg-gray-600 flex justify-center items-center transform transition-colors duration-500 cursor-pointer">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Header;
