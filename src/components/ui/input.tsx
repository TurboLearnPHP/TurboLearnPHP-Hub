import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base",
          "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "transition-all duration-300 ease-out",
          "hover:border-muted-foreground/50 hover:bg-accent/5",
          "focus:outline-none focus:border-primary focus:bg-background",
          "focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15),0_0_20px_hsl(var(--primary)/0.1)]",
          "focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
