import { Link, useLocation } from "wouter";
import { LayoutDashboard, Target, ListTodo, Gift, Image as ImageIcon, BarChart2, Calendar, Settings, LogOut } from "lucide-react";
import { useUser, useClerk } from "@clerk/react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Goals", href: "/goals", icon: Target },
  { label: "All Goals", href: "/all-goals", icon: ListTodo },
  { label: "Rewards", href: "/rewards", icon: Gift },
  { label: "Vision Board", href: "/vision-board", icon: ImageIcon },
  { label: "Statistics", href: "/statistics", icon: BarChart2 },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();
  const initials = (user?.firstName?.[0] || user?.username?.[0] || user?.primaryEmailAddress?.emailAddress?.[0] || "?").toUpperCase();
  const displayName = user?.firstName || user?.username || user?.primaryEmailAddress?.emailAddress || "Friend";

  return (
    <aside className="w-64 fixed left-0 top-0 bottom-0 bg-white/60 backdrop-blur-xl border-r border-sidebar-border hidden md:flex flex-col p-6 shadow-sm z-50">
      <div className="mb-10">
        <Link href="/">
          <div className="cursor-pointer">
            <h1 className="font-serif text-3xl text-[#b89b5e] italic mb-1 tracking-wide font-medium">GloApp</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">becoming my highest self</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = location === item.href || (location.startsWith(item.href) && item.href !== "/");
          return (
            <Link key={item.label} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 cursor-pointer text-sm font-medium",
                  active 
                    ? "bg-primary/40 text-primary-foreground shadow-sm translate-x-1" 
                    : "text-muted-foreground hover:bg-black/5 hover:text-foreground hover:translate-x-1"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 space-y-3">
        <div className="glass-card rounded-2xl p-3 flex items-center gap-3 bg-white/70 border border-white/60">
          <div className="w-10 h-10 rounded-full bg-primary/40 flex items-center justify-center text-primary-foreground font-medium">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">synced</p>
          </div>
          <button
            onClick={() => signOut()}
            className="p-2 rounded-lg text-muted-foreground hover:bg-black/5 hover:text-foreground transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center text-center relative overflow-hidden bg-gradient-to-b from-white/80 to-primary/20 border-none shadow-md">
          <div className="absolute inset-0 bg-[url('cloud-illustration.png')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
          <img src="cloud-illustration.png" alt="Cloud" className="w-16 h-16 mb-2 relative z-10" />
          <p className="text-xs font-serif italic text-foreground relative z-10">
            "You're glowing from the inside out."
          </p>
        </div>
      </div>
    </aside>
  );
}
