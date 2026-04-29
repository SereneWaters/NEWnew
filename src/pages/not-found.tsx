import { Link } from "wouter";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-primary/10">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl text-center flex flex-col items-center shadow-xl">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary-foreground mb-6">
          <img src="/cloud-illustration.png" alt="Cloud" className="w-16 h-16 opacity-80" />
        </div>
        <h1 className="text-4xl font-serif text-foreground mb-2 italic">Lost your way?</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist, but you're still on the right path.
        </p>
        <Link href="/">
          <button className="flex items-center gap-2 bg-primary/80 hover:bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium transition-all shadow-sm hover:shadow-md cursor-pointer">
            <MoveLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}