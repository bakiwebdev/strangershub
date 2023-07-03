import { XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface IInputTextArea {
  selectedImage: string | null;
  resetImage: () => void;
  messageValue: string;
  setMessageValue: (value: string) => void;
}

const InputTextArea = (props: IInputTextArea) => {
  return (
    <div className="w-full rounded-full h-full">
      {/* text area */}
      <textarea
        className="text-sm w-full rounded-md h-full bg-transparent pt-2 px-4 outline-none text-slate-200 tracking-wide appearance-none"
        style={{ overflow: "hidden" }}
        rows={1}
        value={props.messageValue}
        onChange={(e) => props.setMessageValue(e.target.value)}
        onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
        }}
        placeholder="Share something..."
      />
      {props.selectedImage && (
        <div className="w-full px-2 py-4 flex flex-wrap gap-2 relative">
          {/* img reset button */}
          <div
            onClick={props.resetImage}
            className="absolute bg-slate-800/50 hover:bg-slate-800/80 cursor-pointer rounded-full top-6 left-5"
          >
            <XCircleIcon className="w-6 h-6 text-slate-200" />
          </div>
          <Image
            src={props.selectedImage}
            alt="selectedImage"
            width={500}
            height={500}
            className="object-fill w-full rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default InputTextArea;
