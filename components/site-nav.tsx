import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto w-full flex h-14 items-center justify-between px-6">
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 font-bold text-xl tracking-tighter"
          >
            <div className="relative h-8 w-32">
                <Image 
                    src="/logo-dark.webp" 
                    alt="Squareblog" 
                    fill 
                    className="object-contain dark:hidden" 
                    priority
                />
                <Image 
                    src="/logo-light.webp" 
                    alt="Squareblog" 
                    fill 
                    className="object-contain hidden dark:block" 
                    priority
                />
            </div>
          </Link>
        </div>

        <div className="flex flex-1 w-full justify-end">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
