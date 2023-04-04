import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: ReactNode;
  closeModal?: () => void;
  maxWidth?: number;
};

export default function Modal({
  children,
  closeModal,
  maxWidth = 512,
}: ModalProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const portal = document.getElementById("portal");
  if (!portal) throw new Error("Portal element not found");

  return ReactDOM.createPortal(
    <div
      onClick={closeModal}
      className="fixed z-50 top-0 w-screen h-screen flex items-center justify-center bg-slate-950 bg-opacity-80 rounded-lg"
    >
      <div
        className="w-full"
        style={{ maxWidth: `${maxWidth}px` }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    portal
  );
}
