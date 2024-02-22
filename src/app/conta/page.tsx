/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { User } from "@/types/user";
import { useClerk, useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function arraysAreEqual(array1: string[], array2: string[]) {
  if (array1.length !== array2.length) return false;
  return array1.every((element) => array2.includes(element));
}

const badges = [
  {
    name: "verified",
    image:
      "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_65bde2aab77a4f2ab005f54ea73b8d47/default/light/3.0",
  },
  {
    name: "cellbit-logo",
    image: "https://pbs.twimg.com/media/GG5WqxoXMAAaRFP?format=png&name=small",
  },
  {
    name: "blood",
    image: "https://pbs.twimg.com/media/GGosXatXAAA0CRQ?format=png&name=large",
  },
  {
    name: "knowledge",
    image: "https://pbs.twimg.com/media/GGpoA1_XQAAoWuc?format=png&name=large",
  },
  {
    name: "death",
    image: "https://pbs.twimg.com/media/GGpnu6eWgAA8d8Q?format=png&name=large",
  },
  {
    name: "energy",
    image: "https://pbs.twimg.com/media/GGpoJd9WcAANjlK?format=png&name=large",
  },
] as const;

export default function Account() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userData, isLoading } = useQuery<User>({
    queryKey: [
      "user-data",
      "signed-in:" + !!isSignedIn,
      "user:" + user?.username ?? "",
    ],
    queryFn: async () => {
      if (!isSignedIn || !user)
        return {
          username: "",
          verified: false,
          "cellbit-logo": false,
          blood: false,
          knowledge: false,
          death: false,
          energy: false,
        };

      const { data } = await axios.get<{ data: User[] }>("/api/user", {
        params: {
          username: user.username,
        },
      });

      if (typeof data.data[0] === "undefined") {
        const { data } = await axios.post<{ data: User[] }>("/api/user", {
          username: user.username,
          verified: true,
          "cellbit-logo": true,
          blood: true,
          knowledge: true,
          death: true,
          energy: true,
        });

        return data.data[0];
      }

      return data.data[0];
    },
  });

  const initialSelected = useMemo(() => {
    return userData && userData?.username !== ""
      ? Object.entries(userData)
          .filter(([, value]) => value === true)
          .map(([name]) => name)
      : [];
  }, [userData]);
  const [selected, setSelected] = useState(initialSelected as string[]);

  useEffect(() => {
    setSelected(initialSelected as string[]);
  }, [initialSelected]);

  const { mutateAsync: updateUser, isPending } = useMutation({
    mutationFn: async () => {
      if (!isSignedIn || !user) return;

      await axios.post("/api/user", {
        username: user.username,
        verified: selected.includes("verified"),
        "cellbit-logo": selected.includes("cellbit-logo"),
        blood: selected.includes("blood"),
        knowledge: selected.includes("knowledge"),
        death: selected.includes("death"),
        energy: selected.includes("energy"),
      });

      queryClient.setQueryData(
        ["user-data", "signed-in:true", "user:" + user.username],
        (data: User) => {
          return {
            ...data,
            verified: selected.includes("verified"),
            "cellbit-logo": selected.includes("cellbit-logo"),
            blood: selected.includes("blood"),
            knowledge: selected.includes("knowledge"),
            death: selected.includes("death"),
            energy: selected.includes("energy"),
          };
        }
      );
    },
  });

  if (isSignedIn && user && userData?.username !== "" && !isLoading)
    return (
      <main className="flex flex-col items-center w-full max-w-md">
        <section className="flex flex-col items-center gap-1.5">
          <span className="text-sm text-muted-foreground">
            Seus tweets ficarão assim:
          </span>
          <article className="w-full flex gap-3 items-center bg-muted/20 px-6 py-2 rounded-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.imageUrl}
              alt="profile"
              width={160}
              height={160}
              className="size-10 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center pt-1">
                <h1 className="font-medium">{user.fullName}</h1>
                {badges
                  .filter((badge) => selected.includes(badge.name))
                  .map((badge) => (
                    <img
                      key={badge.name}
                      src={badge.image}
                      alt={badge.name}
                      width={160}
                      height={160}
                      className={
                        "size-5 object-contain " +
                        (badge.name === "cellbit-logo"
                          ? "mix-blend-exclusion"
                          : "")
                      }
                    />
                  ))}
                <h2 className="text-sm text-muted-foreground ">
                  @{user.username}
                </h2>
              </div>
              <p className="text-sm ">
                Lorem ipsum dolor sit amet consectetur elit.
              </p>
            </div>
          </article>
        </section>
        <div className="mt-16 flex flex-col items-end gap-3">
          <ToggleGroup
            type="multiple"
            value={selected}
            onValueChange={setSelected}
          >
            {badges.map((badge) => (
              <ToggleGroupItem value={badge.name} key={badge.name}>
                <img
                  src={badge.image}
                  alt={badge.name}
                  className={
                    "size-6 object-contain " +
                    (badge.name === "cellbit-logo" ? "mix-blend-exclusion" : "")
                  }
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Button
            className="h-8"
            size="sm"
            disabled={arraysAreEqual(selected, initialSelected) || isPending}
            onClick={() => updateUser()}
          >
            Salvar
          </Button>
        </div>
        <div className="mt-4 text-center text-muted-foreground text-sm">
          <p className="w-full">Procure escolher só até 3 badges</p>
          <p className="text-balance w-full mt-2">
            As alterações podem demorar até <strong>15 minutos</strong> para
            serem aplicadas
          </p>
        </div>
        {/* <Button variant="ghost" size="sm" className="gap-2 mt-16">
          Como instalar <HelpCircle size="1rem" />
        </Button> */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-muted-foreground absolute bottom-6"
          onClick={() => signOut(() => router.push("/"))}
        >
          Trocar de conta <LogOut size="1rem" />
        </Button>
      </main>
    );

  if (isLoading) return <Loader2 size="1rem" className="animate-spin" />;

  return null;
}
