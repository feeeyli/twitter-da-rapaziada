"use client";

import { Button } from "@/components/ui/button";
import { SignIn, useSession } from "@clerk/nextjs";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { isSignedIn } = useSession();

  return (
    <main className="flex flex-col items-center gap-6 w-[90%] max-w-md">
      <h1 className="text-2xl font-semibold flex items-center flex-wrap justify-center gap-x-4 gap-y-2">
        Twitter da rapaziada{" "}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_65bde2aab77a4f2ab005f54ea73b8d47/default/light/3.0"
          alt="cellA"
          className="size-8"
        />
      </h1>
      {typeof isSignedIn === "undefined" && (
        <Loader2 className="animate-spin" size="1rem" />
      )}
      {isSignedIn === false && <SignIn />}
      {isSignedIn && (
        <Button variant="outline" className="w-full gap-2" asChild>
          <Link href="/conta">
            Acessar sua conta <ArrowRight size="1rem" />
          </Link>
        </Button>
      )}
      {/* <Button variant="ghost" size="sm" className="gap-2">
        Como instalar <HelpCircle size="1rem" />
      </Button> */}
    </main>
  );
}
