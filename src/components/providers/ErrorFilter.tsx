"use client";

import { useEffect } from "react";

/**
 * ErrorFilter Component
 * 
 * This component adds a global error listener to suppress "React Error #299" 
 * and other crashes caused by the Monica Chrome extension (or other extensions).
 * It intercepts errors originating from 'chrome-extension://' URLs before 
 * they reach the Next.js Error Overlay.
 */
export function ErrorFilter({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Filter out errors that are known to come from extensions but still trigger the React/Next overlay
      if (
        event.filename?.includes("chrome-extension://") ||
        event.message?.includes("React error #299") ||
        event.message?.includes("Minified React error #299")
      ) {
        console.warn("Suppressed extension-related React error to prevent overlay disruption:", event.message);
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      // Extension-related promise rejections
      if (
        event.reason?.stack?.includes("chrome-extension://") ||
        event.reason?.message?.includes("React error #299")
      ) {
        console.warn("Suppressed extension-related promise rejection:", event.reason?.message);
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleRejection, true);

    return () => {
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleRejection, true);
    };
  }, []);

  return <>{children}</>;
}
