import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm font-mono text-muted-foreground">
          &copy; 2025 Squareblog. Built for clarity.
        </p>
        <div className="flex gap-8 text-sm font-mono text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors hover:underline decoration-1 underline-offset-4">[Twitter/X]</Link>
          <Link href="#" className="hover:text-foreground transition-colors hover:underline decoration-1 underline-offset-4">[LinkedIn]</Link>
          <Link href="#" className="hover:text-foreground transition-colors hover:underline decoration-1 underline-offset-4">[RSS Feed]</Link>
        </div>
      </div>
    </footer>
  );
}
