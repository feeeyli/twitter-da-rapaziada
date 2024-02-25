"use client";
import { createContext, useContext } from "react";

export const SessionContext = createContext({
  session: null,
  user: null,
});
export const useSession = () => useContext(SessionContext);
