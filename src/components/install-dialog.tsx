/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function InstallDialog({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("gap-2", className)}>
          Como instalar <HelpCircle size="1rem" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como instalar?</DialogTitle>
          <div className="flex gap-2 mx-auto pt-4">
            <Button
              variant="ghost"
              className="h-auto flex-col gap-4 py-6 px-6 text-base"
              asChild
            >
              <Link
                href="https://github.com/feeeyli/twitter-da-rapaziada/blob/main/README.md#instalando-o-script-no-pc"
                target="_blank"
              >
                <img
                  src="https://abs-0.twimg.com/emoji/v2/svg/1f4bb.svg"
                  className="size-28 object-contain"
                  alt="Computador"
                />
                Para PC
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="h-auto flex-col gap-4 py-6 px-6 text-base"
              asChild
            >
              <Link
                href="https://github.com/feeeyli/twitter-da-rapaziada/blob/main/README.md#instalando-o-script-no-celular"
                target="_blank"
              >
                <img
                  src="https://abs-0.twimg.com/emoji/v2/svg/1f4f1.svg"
                  className="size-28 object-contain"
                  alt="Computador"
                />
                Para Celular
              </Link>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
