import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
        "ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
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
});
Textarea.displayName = "Textarea";

export { Textarea };
