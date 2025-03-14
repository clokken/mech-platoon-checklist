import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  close: () => void;
};

export default function Modal({ children, close }: ModalProps) {
  return (
    <div
      className="overflow-hidden fixed inset-0 bg-[#000000a0] p-4 z-10"
      onClick={close}
    >
      {children}
    </div>
  );
}
