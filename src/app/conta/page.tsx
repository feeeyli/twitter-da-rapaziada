// @ts-nocheck

import { InstallDialog } from "@/components/install-dialog";
import { Button } from "@/components/ui/button";
import { lucia, validateRequest } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { ActionResult } from "next/dist/server/app-render/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BadgeSelector } from "./badge-selector";

export default async function Account() {
  const { user } = await validateRequest();

  if (user)
    return (
      <main className="flex flex-col items-center w-full max-w-md">
        <BadgeSelector user={user} />
        <div className="mt-4 text-center text-muted-foreground text-sm">
          <p className="w-full">Procure escolher só até 3 badges</p>
          <p className="text-balance w-full mt-2">
            As alterações podem demorar até <strong>15 minutos</strong> para
            serem aplicadas
          </p>
          <p className="text-balance w-full">
            Além disso, elas só serão aplicadas em novas abas do Twitter
          </p>
        </div>
        <InstallDialog className="mt-8" />
        <form action={logout} className="absolute bottom-6">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-muted-foreground"
          >
            Trocar de conta <LogOut size="1rem" />
          </Button>
        </form>
      </main>
    );

  redirect("/");

  // return <Loader2 size="1rem" className="animate-spin" />;
}

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
