import Link from "next/link";
import React, { Fragment } from "react";
import { useRouter } from "next/dist/client/router";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "public/logo/strangers_hub.svg";

const Header = () => {
  const router = useRouter();
  const currentPage = router.pathname.split("/")[1];

  return (
    <nav className="w-full mx-auto fixed top-0 right-0 bg-slate-800 z-30 py-2 px-4 duration-200">
      <div className="container w-full mx-auto grid grid-cols-4 max-w-7xl">
        <Link href="/" className="flex w-fit items-center gap-1 md:gap-2">
          <Image
            src={logo}
            alt="SH logo"
            width={40}
            height={40}
            className="h-9 w-9 md:h-10 md:w-10"
          />
          <h3 className="text-md md:text-lg mr-2 font-semibold ml-3 flex justify-center items-center gap-1">
            Strangers Hub
          </h3>
        </Link>
        {/* menu */}
        <section className="col-span-2">
          <div>menu</div>
        </section>
        {/* profile and logout */}
        <section>
          <div>profile</div>
        </section>
      </div>
    </nav>
  );
};

export default Header;
