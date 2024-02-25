"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "lucia";
import { Loader2 } from "lucide-react";
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

type BadgeSelectorProps = {
  user: User;
};

export function BadgeSelector({ user }: BadgeSelectorProps) {
  const queryClient = useQueryClient();
  const { data: userData, isLoading } = useQuery<User>({
    queryKey: ["user-data", "user:" + user?.username ?? ""],
    queryFn: async () => {
      const { data } = await axios.get<{ data: User[] }>("/api/user", {
        params: {
          username: user.username.toLocaleLowerCase(),
        },
      });

      if (typeof data.data[0] === "undefined") {
        const { data } = await axios.post<{ data: User[] }>(
          "/api/user",
          {
            username: user.username.toLocaleLowerCase(),
            verified: true,
            "cellbit-logo": true,
            blood: true,
            knowledge: true,
            death: true,
            energy: true,
          },
          {
            headers: {
              token: process.env.NEXT_PUBLIC_API_SECRET!,
            },
          }
        );

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
      await axios.post(
        "/api/user",
        {
          username: user.username.toLocaleLowerCase(),
          verified: selected.includes("verified"),
          "cellbit-logo": selected.includes("cellbit-logo"),
          blood: selected.includes("blood"),
          knowledge: selected.includes("knowledge"),
          death: selected.includes("death"),
          energy: selected.includes("energy"),
        },
        {
          headers: {
            token: process.env.NEXT_PUBLIC_API_SECRET!,
          },
        }
      );

      queryClient.setQueryData(
        ["user-data", "user:" + user.username.toLocaleLowerCase()],
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

  if (isLoading) {
    return (
      <div className="py-8">
        <Loader2 size="1rem" className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col items-center gap-1.5">
        <span className="text-sm text-muted-foreground">
          Seus tweets ficarão assim:
        </span>
        <article className="w-full flex gap-3 items-center bg-muted/20 px-6 py-2 rounded-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <img
              src={user.imageUrl}
              alt="profile"
              width={160}
              height={160}
              className="size-10 rounded-full"
            /> */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center pt-1">
              <h1 className="font-medium">{user.name}</h1>
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
    </>
  );
}
