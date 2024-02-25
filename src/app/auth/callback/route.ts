import { lucia, twitter } from "@/lib/auth";
import { db } from "@/lib/db";
import { userAccountTable } from "@/lib/schema";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("state")?.value ?? null;
  const storedCodeVerifier = cookies().get("code_verifier")?.value ?? null;

  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storedCodeVerifier
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await twitter.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );
    const response = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const { data: twitterUser }: { data: TwitterUser } = await response.json();

    // Replace this with your own DB client.
    // const existingUser = await db.table("user").where("github_id", "=", twitterUser.id).get();
    const [existingUser] = await db
      .select()
      .from(userAccountTable)
      .where(eq(userAccountTable.id, twitterUser.id));

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    // Replace this with your own DB client.
    // await db.table("user").insert({
    // 	id: userId,
    // 	github_id: twitterUser.id,
    // 	username: twitterUser.login
    // });
    await db.insert(userAccountTable).values({
      ...twitterUser,
    });

    const session = await lucia.createSession(twitterUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/conta",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    console.log("> fail", e);
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

type TwitterUser = {
  id: string;
  name: string;
  username: string;
};
