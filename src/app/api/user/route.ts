import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

async function getUser(username: string) {
  const { data: user } = await supabase
    .from("users")
    .select()
    .eq("username", username);

  return user;
}

async function setUser(data: { username: string; verified: boolean }) {
  const { data: user } = await supabase.from("users").upsert(data).select();

  return user;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const username = searchParams.get("username");

  if (!username) return NextResponse.json({ data: null });

  const data = await getUser(username);

  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body) return NextResponse.json({ data: null });

  const data = await setUser(body as { username: string; verified: boolean });

  return NextResponse.json({ data });
}
