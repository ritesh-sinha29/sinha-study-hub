"use client";

import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter, useSearchParams as useNextSearchParams } from "next/navigation";
import React from "react";

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, "href"> & {
  to: string;
  href?: string;
};

export function Link({ to, href, ...rest }: LinkProps) {
  // `href` is ignored on purpose to emulate react-router's `to`
  return <NextLink href={to as any} {...rest} />;
}

export function useNavigate() {
  const router = useRouter();
  return (to: string) => router.push(to);
}

export function useLocation() {
  const pathname = usePathname();
  return { pathname };
}

export function useParams<T extends Record<string, string | string[]>>() {
  return useNextParams<T>();
}

export function useSearchParams(): [URLSearchParams] {
  const sp = useNextSearchParams();
  return [sp as unknown as URLSearchParams];
}

