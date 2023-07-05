import { MouseEventHandler } from "react";
import clsx from "clsx";

interface IButton {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Button = (props: IButton) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={clsx(
        `flex justify-center items-center gap-1 ${props.className}`,
        {}
      )}
    >
      {/* <PaperClipIcon className="w-4 h-4 text-green-500" /> */}
      {props.icon}
      {props.name}
    </button>
  );
};

export default Button;
