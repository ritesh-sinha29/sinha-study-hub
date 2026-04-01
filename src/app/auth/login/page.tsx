"use client";

import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 flex flex-col items-center"
      >
        <div className="text-center mb-4">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl shadow-indigo-200 dark:shadow-none">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to access your study resources
          </p>
        </div>

        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-xl border border-gray-100 dark:border-gray-700 rounded-3xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "rounded-xl border-gray-200 hover:bg-gray-50 transition-all",
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none",
              formFieldInput: "rounded-xl border-gray-200 focus:ring-indigo-500 focus:border-indigo-500",
              footerActionLink: "text-indigo-600 hover:text-indigo-700 font-bold",
            }
          }}
          routing="path"
          path="/auth/login"
          signUpUrl="/auth/register"
        />
      </motion.div>
    </div>
  );
}
