import { toggleModal } from "@/utils/functions.util";
import { FC, ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { log } from "node:console";

interface ModalProps {
  id: string;
  children: ReactNode;

  onClose?: () => void;
}

const Modal: FC<ModalProps> = ({ id, children, onClose }) => {
  return (
    <dialog
      id={id}
      className="relative w-1/3 rounded-sm bg-white p-6 shadow-2xl shadow-black/20 dark:bg-meta-4 dark:shadow-black/20"
    >
      <div className="mb-4 flex justify-end">
        <X
          size={25}
          className="text-primary hover:cursor-pointer"
          onClick={() => {
            if (onClose) {
              onClose();
            }
            toggleModal(id);
          }}
        />
      </div>

      {children}
    </dialog>
  );
};

export default Modal;
