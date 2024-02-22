import { QueryClientProvider } from "@/components/query-client-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Twitter da rapaziada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased dark flex items-center justify-center",
            inter.variable
          )}
        >
          <QueryClientProvider>{children}</QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
