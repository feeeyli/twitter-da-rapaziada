import { supabase } from "@/lib/supabase";
import { NextApiResponse } from "next";
import { unstable_cache } from "next/cache";

const getAccounts = unstable_cache(
  async function (usernames: string[]) {
    if (usernames.length === 0) {
      const { data: users } = await supabase
        .from("users")
        .select()
        // get by verified, cellbit-logo, blood, knowledge, death, energy
        .or(
          "verified.eq.true,cellbit-logo.eq.true,blood.eq.true,knowledge.eq.true,death.eq.true,energy.eq.true"
        );

      return users;
    }

    const { data: users } = await supabase
      .from("users")
      .select()
      .in("username", usernames)
      .or(
        "verified.eq.true,cellbit-logo.eq.true,blood.eq.true,knowledge.eq.true,death.eq.true,energy.eq.true"
      );

    return users;
  },
  [],
  {
    revalidate: 900,
  }
);

export async function GET(req: Request, res: NextApiResponse) {
  const { searchParams } = new URL(req.url);

  const usernames = searchParams.getAll("username");

  const data = await getAccounts(usernames);

  return Response.json({ data });
}
