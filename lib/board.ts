import "server-only";
import { createClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/env";

export type BoardType = "gallery" | "news" | "event";

export type BoardPost = {
  id: string;
  type: BoardType;
  title: string;
  body: string | null;
  images: string[];
  event_date: string | null;
  published: boolean;
  created_at: string;
};

/** 공개된 게시글을 타입별로 조회 (RLS: published = true). */
export async function getBoardPosts(type: BoardType): Promise<BoardPost[]> {
  if (!supabaseConfigured) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("equre_board_posts")
      .select("id, type, title, body, images, event_date, published, created_at")
      .eq("type", type)
      .eq("published", true)
      .order("created_at", { ascending: false });
    return (data ?? []) as BoardPost[];
  } catch {
    return [];
  }
}
