import * as React from "react";

import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  decorative?: boolean;
}

export function Separator({
  className,
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent",
        className
      )}
      {...props}
    />
  );
}

