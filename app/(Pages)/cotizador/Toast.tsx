"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const TOAST_PARAM_NAME = "toast_message";

const Toast = () => {
  const searchParams = useSearchParams(); // Read only search params
  const router = useRouter(); // For navigating/replacing URL
  const pathname = usePathname(); // Get current path

  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Function to hide the toast and clear the URL param
  const hideToast = useCallback(() => {
    setIsVisible(false);
    setMessage(null);

    // Create new search params without the toast message
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(TOAST_PARAM_NAME);

    // Update the URL without adding a new history entry
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }, [searchParams, router, pathname]);

  useEffect(() => {
    const currentMessage = searchParams.get(TOAST_PARAM_NAME);

    if (currentMessage) {
      // Only proceed if there's a message in the URL
      // Check if the message has actually changed to avoid unnecessary re-triggers
      if (currentMessage !== message || !isVisible) {
        setMessage(currentMessage);
        setIsVisible(true);

        // Set a timeout to automatically hide the toast
        const timer = setTimeout(() => {
          hideToast();
        }, 3000); // Toast will disappear after 3 seconds

        return () => clearTimeout(timer); // Clear timeout on cleanup
      }
    } else if (!currentMessage && isVisible) {
      // If the URL param is cleared externally while toast is visible, hide it
      hideToast();
    }
  }, [searchParams, hideToast, message, isVisible]); // Removed location.pathname, useSearchParams handles changes
  console.log("here");
  if (!isVisible) {
    return null; // Don't render if not visible
  }
  return (
    <div
      className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm absolute bottom-10 right-10 z-[100]"
      role="alert"
    >
      <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg  ">
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8    -700"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
