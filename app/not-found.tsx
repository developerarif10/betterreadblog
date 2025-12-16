import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center w-full z-10">
      <div className="text-center flex flex-col gap-4 max-w-xs mx-auto relative">
        <h1 className="text-8xl font-mono font-bold drop-shadow-lg text-primary">
          404
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed text-center tracking-tight text-balance">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The
          page might have been moved, deleted, or you entered the wrong URL.
        </p>
        <Button asChild className="w-full rounded-lg h-9 drop-shadow-lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
