"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type BoardType = "gallery" | "news" | "event";
type Post = {
  id: string;
  type: BoardType;
  title: string;
  body: string | null;
  images: string[];
  event_date: string | null;
  published: boolean;
  created_at: string;
};

const TYPES: { value: BoardType; label: string }[] = [
  { value: "gallery", label: "Gallery (갤러리)" },
  { value: "news", label: "News (뉴스)" },
  { value: "event", label: "Event (이벤트)" },
];

const inputCls =
  "w-full border border-line-strong bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-accent";

export function BoardManager() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [type, setType] = useState<BoardType>("gallery");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const { data } = await supabase
      .from("equre_board_posts")
      .select("id, type, title, body, images, event_date, published, created_at")
      .order("created_at", { ascending: false });
    setPosts((data ?? []) as Post[]);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim()) return setError("제목을 입력하세요.");
    setBusy(true);
    try {
      const urls: string[] = [];
      if (files && files.length) {
        for (const file of Array.from(files)) {
          const ext = file.name.split(".").pop() || "jpg";
          const path = `${type}/${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}.${ext}`;
          const { error: upErr } = await supabase.storage
            .from("board")
            .upload(path, file);
          if (upErr) throw upErr;
          urls.push(supabase.storage.from("board").getPublicUrl(path).data.publicUrl);
        }
      }
      const { error: insErr } = await supabase.from("equre_board_posts").insert({
        type,
        title: title.trim(),
        body: body.trim() || null,
        images: urls,
        event_date: type === "event" && eventDate ? eventDate : null,
      });
      if (insErr) throw insErr;
      setTitle("");
      setBody("");
      setEventDate("");
      setFiles(null);
      (document.getElementById("board-files") as HTMLInputElement | null)?.value &&
        ((document.getElementById("board-files") as HTMLInputElement).value = "");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("이 글을 삭제할까요?")) return;
    const { error: delErr } = await supabase
      .from("equre_board_posts")
      .delete()
      .eq("id", id);
    if (delErr) return setError(delErr.message);
    await load();
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[380px_1fr]">
      {/* form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="font-display text-lg font-bold tracking-tight">새 글 작성</h2>

        <div>
          <label className="label mb-1.5 block text-muted">유형</label>
          <select
            className={inputCls}
            value={type}
            onChange={(e) => setType(e.target.value as BoardType)}
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label mb-1.5 block text-muted">제목</label>
          <input
            className={inputCls}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </div>

        {type !== "gallery" && (
          <div>
            <label className="label mb-1.5 block text-muted">본문</label>
            <textarea
              className={`${inputCls} min-h-32`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="내용"
            />
          </div>
        )}

        {type === "event" && (
          <div>
            <label className="label mb-1.5 block text-muted">일자</label>
            <input
              type="date"
              className={inputCls}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>
        )}

        <div>
          <label className="label mb-1.5 block text-muted">
            {type === "gallery" ? "이미지 (여러 장 가능)" : "커버 이미지 (선택)"}
          </label>
          <input
            id="board-files"
            type="file"
            accept="image/*"
            multiple={type === "gallery"}
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full text-sm text-muted file:mr-3 file:border file:border-line-strong file:bg-bg file:px-3 file:py-2 file:text-sm file:text-ink"
          />
        </div>

        {error && <p className="text-sm text-alert">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dim disabled:opacity-50"
        >
          {busy ? "저장 중…" : "등록"}
        </button>
      </form>

      {/* list */}
      <div>
        <h2 className="font-display text-lg font-bold tracking-tight">
          등록된 글 ({posts.length})
        </h2>
        <div className="mt-4 border-t border-line-strong">
          {posts.length === 0 ? (
            <p className="py-6 text-sm text-muted">아직 글이 없습니다.</p>
          ) : (
            posts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 border-b border-line py-4"
              >
                {p.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.images[0]}
                    alt=""
                    className="h-12 w-12 shrink-0 border border-line object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <span className="label text-accent">{p.type}</span>
                  <p className="truncate text-sm font-medium text-ink">{p.title}</p>
                  <p className="text-xs text-faint">
                    {p.event_date ?? p.created_at.slice(0, 10)}
                    {p.images.length > 1 ? ` · 이미지 ${p.images.length}장` : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="shrink-0 border border-line-strong px-3 py-1.5 text-xs text-ink transition-colors hover:bg-alert hover:text-white"
                >
                  삭제
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
