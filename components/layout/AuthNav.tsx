"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";

type State =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "user"; name: string; isAdmin: boolean };

export function AuthNav() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!supabaseConfigured) {
      setState({ status: "guest" });
      return;
    }
    const supabase = createClient();

    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setState({ status: "guest" });
        return;
      }
      const { data: profile } = await supabase
        .from("equre_profiles")
        .select("name, role")
        .eq("id", user.id)
        .single();
      setState({
        status: "user",
        name: profile?.name || user.email || "회원",
        isAdmin: profile?.role === "admin",
      });
    };

    load();
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    return () => sub.subscription.unsubscribe();
  }, []);

  if (state.status === "loading") {
    return <span className="hidden h-4 w-16 min-[1340px]:block" aria-hidden />;
  }

  if (state.status === "user") {
    return (
      <div className="hidden items-center gap-4 min-[1340px]:flex">
        {state.isAdmin && (
          <Link
            href="/admin"
            className="label whitespace-nowrap text-accent transition-colors hover:text-accent-dim"
          >
            Admin
          </Link>
        )}
        <Link
          href="/mypage"
          className="label whitespace-nowrap text-muted transition-colors hover:text-ink"
        >
          {state.name}
        </Link>
        <Link
          href="/logout"
          className="label whitespace-nowrap text-muted transition-colors hover:text-ink"
        >
          로그아웃
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-4 min-[1340px]:flex">
      <Link
        href="/login"
        className="label whitespace-nowrap text-muted transition-colors hover:text-ink"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="label whitespace-nowrap text-muted transition-colors hover:text-ink"
      >
        회원가입
      </Link>
    </div>
  );
}
