import { Link } from "wouter";
import { Sparkles, Cloud, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-br from-[#f5edfb] via-[#fdf6fa] to-[#eef0fb]">
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <img
          src="hero.png"
          className="w-full h-full object-cover mix-blend-soft-light"
          alt=""
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-20">
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-[#b89cdc]" />
            <span className="font-serif italic text-2xl text-[#7a5da8]">
              GloApp
            </span>
          </div>
          <div className="flex gap-2">
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="rounded-xl text-[#3b2a55] hover:bg-white/50"
              >
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="rounded-xl bg-[#b89cdc] hover:bg-[#a989d0] text-white">
                Get started
              </Button>
            </Link>
          </div>
        </header>

        <main className="text-center max-w-3xl mx-auto py-10">
          <p className="uppercase tracking-[0.3em] text-xs text-[#7a6e91] mb-6">
            becoming my highest self
          </p>
          <h1 className="font-serif italic text-5xl md:text-7xl text-[#3b2a55] leading-tight mb-8">
            "Discipline today,
            <br /> freedom tomorrow."
          </h1>
          <p className="text-lg text-[#5a4d70] mb-10 max-w-xl mx-auto">
            A dreamy place to track your goals, celebrate streaks, and visualize
            the life you're becoming. Synced across all your devices.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/sign-up">
              <Button className="rounded-2xl h-12 px-8 bg-[#b89cdc] hover:bg-[#a989d0] text-white text-base shadow-lg shadow-[#b89cdc]/30">
                <Sparkles className="w-4 h-4 mr-2" />
                Start glowing
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="rounded-2xl h-12 px-8 border-[#d6c4ec] bg-white/60 hover:bg-white text-[#3b2a55] text-base backdrop-blur"
              >
                I have an account
              </Button>
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[
              {
                icon: Sparkles,
                title: "Daily check-ins",
                body: "Mark goals as done or skipped with a tap, build streaks that compound.",
              },
              {
                icon: Heart,
                title: "Rewards you'll actually use",
                body: "Attach little gifts to big habits. Your future self says thanks.",
              },
              {
                icon: Cloud,
                title: "Synced everywhere",
                body: "Your goals, vision board, and progress travel with you across devices.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/60 p-6 shadow-sm"
              >
                <f.icon className="w-5 h-5 text-[#7a5da8] mb-3" />
                <h3 className="font-serif text-lg text-[#3b2a55] mb-1">
                  {f.title}
                </h3>
                <p className="text-sm text-[#5a4d70]">{f.body}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
