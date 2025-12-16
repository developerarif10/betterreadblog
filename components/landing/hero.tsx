import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center space-y-10 py-24 text-center md:py-32 px-6 overflow-hidden">
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
          Squareblog.
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-xl md:text-2xl font-medium leading-relaxed">
          Unfiltered thoughts. Structured chaos. <br className="hidden md:inline" />
          A personal archive of ideas and feelings.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="#latest">
            <Button size="lg" className="rounded-none text-lg h-14 px-8 w-full sm:w-auto transition-transform hover:scale-105">Read the Latest</Button>
        </Link>
        <Link href="#philosophy">
            <Button variant="outline" size="lg" className="rounded-none text-lg h-14 px-8 w-full sm:w-auto transition-transform hover:scale-105">The Philosophy</Button>
        </Link>
      </div>
    </section>
  );
}
