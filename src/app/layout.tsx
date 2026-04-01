import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { ErrorFilter } from "@/components/providers/ErrorFilter";
import "./globals.css";

export const metadata: Metadata = {
  title: "SINHA'S STUDY HUB - GTU Resources",
  description: "GTU resources and student community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }} suppressHydrationWarning translate="no">
      <body className="bg-white text-gray-900">
        <ErrorFilter>
          <ConvexClientProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </ConvexClientProvider>
        </ErrorFilter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}

