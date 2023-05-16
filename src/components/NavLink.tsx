import clsx from "clsx";
import Link from "next/link";

interface INavLink {
  href: string;
  name: string;
  active: boolean;
  icon?: React.ReactNode;
}

const NavLink = (props: INavLink) => {
  return (
    <Link
      href={props.href}
      className={clsx("flex gap-2 justify-center items-center", {
        "text-orange-500":  props.active,
      })}
    >
      {props.icon}
      {props.name}
    </Link>
  );
};

export default NavLink;
