import { ChevronDownIcon } from "lucide-react";
import { Text } from "../text";
import { useState, useRef, useEffect } from "react";
import { cn } from "../../utils";

const CustomAccordian = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div>
      <div className={cn("flex flex-col justify-between items-center w-full h-full bg-background-gray-100 hover:bg-background-gray-100 cursor-pointer rounded-lg")}>
        <button
          className="flex justify-between items-center w-full h-full transition-colors duration-200 cursor-pointer group px-6 pt-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text
            weight="semibold"
            variant="body"
            className="text-lg group-hover:translate-x-3 transition-transform duration-200 ease-in-out"
          >
            {title}
          </Text>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out rounded-b-lg px-6 mb-4 w-full"
          style={{ height: `${height}px` }}
        >
          <div ref={contentRef} className="py-2 w-full  md:max-w-[80%]">
            <Text weight="normal" variant="body">
              {content}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAccordian;
