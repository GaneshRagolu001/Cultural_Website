import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const Model = forwardRef(({ children, onClose }, ref) => {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
    close() {
      dialogRef.current.close();
    },
  }));

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="backdrop:bg-stone-900/70 backdrop:backdrop-blur-sm p-0 rounded-[2rem] border-none shadow-2xl max-w-4xl w-[95%] max-h-[85vh] overflow-hidden bg-transparent "
    >
      <div className="bg-[#FDFCFB] relative w-full h-full max-h-[85vh] flex flex-col">
        {/* Close Button - Floats on top */}
        <button
          onClick={() => dialogRef.current.close()}
          className="absolute top-4 right-4 z-50 p-2 bg-white/90 backdrop-blur-md hover:bg-white shadow-md rounded-full transition-all text-stone-400 hover:text-red-600"
        >
          <X size={20} />
        </button>

        {/* Children contains the flex-row layout */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>

      <style jsx>{`
        dialog::backdrop {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Model;
