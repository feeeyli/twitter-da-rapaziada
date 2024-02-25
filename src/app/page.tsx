import { InstallDialog } from "@/components/install-dialog";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const { session } = await validateRequest();
  const isSignedIn = session !== null;

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
      {isSignedIn === false && (
        <p>Em manutenção!!</p>
        // <Button variant="outline" className="w-full gap-2" asChild>
        //   <Link href="/login">
        //     Entrar com Twitter
        //     <svg viewBox="0 0 24 24" className="size-5">
        //       <path
        //         fill="currentColor"
        //         d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        //       ></path>
        //     </svg>
        //   </Link>
        // </Button>
      )}
      {isSignedIn && (
        <Button variant="outline" className="w-full gap-2" asChild>
          <Link href="/conta">
            Acessar sua conta <ArrowRight size="1rem" />
          </Link>
        </Button>
      )}
      <InstallDialog />
    </main>
  );
}
