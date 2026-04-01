"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "@/lib/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  User,
  Home,
  Users,
  FolderOpen,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { SignInButton, SignUpButton, useUser, useClerk } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, Settings, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const { isAuthenticated } = useConvexAuth();
  const storeUser = useMutation(api.users.store);
  const currentUser = useQuery(api.users.currentUser);
  const location = useLocation();

  // Sync user with Convex database on login
  useEffect(() => {
    if (isSignedIn) {
      storeUser();
    }
  }, [isSignedIn, storeUser]);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Resources", path: "/resources", icon: FolderOpen },
    { name: "Community", path: "/community", icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-200"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md shadow-sm"
            >
              <BookOpen className="h-5 w-5 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                SINHA'S STUDY HUB
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                GTU Resources
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
                    isActive(item.path)
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                {currentUser && (
                  <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 leading-none">
                        {currentUser.points} pts
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {currentUser.streak}d streak
                      </span>
                    </div>
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                        <Avatar className="h-8 w-8 border border-indigo-100 dark:border-indigo-900">
                          <AvatarImage src={clerkUser?.imageUrl} />
                          <AvatarFallback className="bg-indigo-600 text-white text-xs">
                            {clerkUser?.firstName?.charAt(0) || clerkUser?.emailAddresses[0]?.emailAddress?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-56 mt-1 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="flex flex-col p-2">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {clerkUser?.fullName || "Account"}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {clerkUser?.primaryEmailAddress?.emailAddress}
                        </span>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-1 bg-gray-100 dark:bg-gray-800" />
                    <Link to="/profile">
                      <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <User className="h-4 w-4" />
                        <span className="font-medium">My Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/dashboard">
                      <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="font-medium">Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator className="my-1 bg-gray-100 dark:bg-gray-800" />
                    <DropdownMenuItem 
                      onClick={() => signOut()}
                      className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="font-medium">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-200 active:scale-95">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
                      isActive(item.path)
                        ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
              {isSignedIn ? (
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span className="font-medium">My Profile</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 flex flex-col gap-2">
                  <SignInButton mode="modal">
                    <button className="w-full text-center py-2 text-gray-600 dark:text-gray-300">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;