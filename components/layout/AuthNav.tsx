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

  const linkClass =
    "whitespace-nowrap text-xs font-medium uppercase tracking-wide text-muted transition-colors hover:text-ink sm:text-[0.8rem]";

  if (state.status === "loading") {
    return <span className="h-4 w-10" aria-hidden />;
  }

  if (state.status === "user") {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {state.isAdmin && (
          <Link
            href="/admin"
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-accent transition-colors hover:text-accent-dim sm:text-[0.8rem]"
          >
            Admin
          </Link>
        )}
        <Link href="/mypage" className={`hidden ${linkClass} sm:inline`}>
          {state.name}
        </Link>
        <Link href="/logout" className={linkClass}>
          로그아웃
        </Link>
      </div>
    );
  }

  return (
    <Link href="/login" className={linkClass}>
      로그인
    </Link>
  );
}
