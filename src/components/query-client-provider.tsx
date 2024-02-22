"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function QueryClientProvider(props: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            // staleTime: 1000 * 30,
          },
        },
      })
  );

  return (
    <ReactQueryClientProvider client={queryClient}>
      {props.children}
    </ReactQueryClientProvider>
  );
}
