import { FC, ReactNode, useState } from "react";
import { Edit, Trash2Icon } from "lucide-react";

interface MultipleActionButtonProps {
  icon?: ReactNode;
  name?: string;
}

const MultipleActionButton: FC<MultipleActionButtonProps> = ({
  icon,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="=inline-flex w-full rounded-sm border border-stroke bg-transparent px-10 py-2 shadow-sm outline-none dark:border-form-strokedark dark:bg-boxdark"
      >
        {name ? name : "Action"}
        {icon && <span> {icon}</span>}
      </button>

      {isOpen && (
        <div className=" absolute right-0 z-99999 w-full rounded-sm bg-white shadow-lg dark:border-form-strokedark dark:bg-form-input">
          <div className="py-1">
            <a
              href="#"
              className=" flex items-center justify-between px-4 py-2 text-sm text-black  hover:bg-body hover:text-white dark:text-white"
              onClick={() => setIsOpen(false)}
            >
              Editer
              <Edit className="text-green-500" size={15} />
            </a>
            <a
              href="#"
              className=" flex items-center justify-between  px-4 py-2 text-sm text-black hover:bg-body hover:text-white dark:text-white"
              onClick={() => setIsOpen(false)}
            >
              Supprimer
              <Trash2Icon className="text-red-500" size={15} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleActionButton;
