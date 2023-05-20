import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Tippy from "@tippyjs/react";
import { useState } from "react";

interface ITooltipColorOption {
  onValueChange: (value: string) => void;
}

const TooltipColorOption = (props: ITooltipColorOption) => {
  const [selectedColor, setSelectedColor] = useState<string>("00ED00");
  let colorList = [
    "ffffff",
    "2BAE66",
    "EDFF00",
    "00A4CC",
    "FFA177",
    "A2A2A1",
    "F9A12E",
    "FE4773",
    "933DC9",
    "61b59f",
    "F63CCA",
    "00ED00",
    "EC2A1C",
    "FF7C00",
    "8FBC8F",
    "FF6347",
  ];
  return (
    <Tippy
      interactive={true}
      placement="bottom-end"
      trigger="click"
      content={
        <div className="w-64 h-fit flex  flex-wrap gap-3">
          {colorList.map((color, idx) => {
            return (
              <span
                key={idx}
                onClick={() => {
                  setSelectedColor(color);
                  props.onValueChange(color);
                }}
                style={{
                  backgroundColor: `#${color}`,
                }}
                className="w-5 h-5 rounded-full cursor-pointer"
              ></span>
            );
          })}
        </div>
      }
    >
      <div className="flex justify-center items-center gap-1 hover:bg-gray-600 transform transition-colors duration-500 px-2 py-1 rounded-md">
        <span
          style={{
            backgroundColor: `#${selectedColor}`,
          }}
          className="w-4 h-4 rounded-sm bg-green-500"
        />
        <ChevronDownIcon className="w-5 h-5" />
      </div>
    </Tippy>
  );
};

export default TooltipColorOption;
