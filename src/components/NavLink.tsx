import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

interface INavLink {
  href: string;
  name: string;
  icon?: React.ReactNode;
}

const NavLink = (props: INavLink) => {
  const router = useRouter();
  const isActive = router.pathname.startsWith(props.href);
  return (
    <Link
      href={props.href}
      className={clsx("flex gap-2 justify-center items-center", {
        "text-orange-500": isActive,
      })}
    >
      {props.icon}
      {props.name}
    </Link>
  );
};

export default NavLink;
