/* ============================================================
   Toast — the small message that slides up from the bottom.
   Any component can call useToast() to show a message.
============================================================ */

import { createContext, useContext, useRef, useState } from "react";

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const timer = useRef(null);

  function showToast(text, error = false) {
    setMessage(text);
    setIsError(error);

    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 3200);
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div className={`toast ${message ? "is-show" : ""} ${isError ? "is-error" : ""}`}>
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
