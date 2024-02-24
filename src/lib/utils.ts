import { User } from "@/types/user";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeUnusedBadges(users: User[] | null) {
  if (!users) return null;

  return users.map((user) => {
    return Object.fromEntries(
      Object.entries(user).filter(
        ([key, value]) => key === "username" || value === true
      )
    );
  });
}
