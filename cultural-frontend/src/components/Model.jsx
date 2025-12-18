import React, { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Model = ({ children, ref }) => {
  const modelref = useRef();
  useImperativeHandle(ref, () => {
    return {
      Open() {
        modelref.current.showModel();
      },
    };
  });
  return createPortal(
    <dialog ref={modelref}>
      {children}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
};

export default Model;
