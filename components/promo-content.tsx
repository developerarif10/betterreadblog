/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PromoContentProps {
  variant?: "desktop" | "mobile";
  className?: string;
}

export function PromoContent({
  variant = "desktop",
  className,
}: PromoContentProps) {
  if (variant === "mobile") {
    return (
      <div className={cn("border-t border-border bg-muted/20 p-4", className)}>
        <div className="flex flex-col gap-2">
            <p className="font-bold text-sm">Squareblog.</p>
            <p className="text-xs text-muted-foreground">Unfiltered thoughts. Structured chaos.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("border border-border rounded-lg p-6 bg-card", className)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold tracking-tighter">
            Squareblog.
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A minimalist space for unfiltered thoughts and structured ideas. 
            Built for clarity and focus.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="w-full">
            <Link href="/">Read More</Link>
        </Button>
      </div>
    </div>
  );
}
