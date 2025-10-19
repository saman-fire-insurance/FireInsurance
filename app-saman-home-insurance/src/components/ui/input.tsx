import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full px-3 py-2 rounded-md border border-border aria-invalid:border-destructive bg-gray-50 placeholder:text-placeholder placeholder:text-sm placeholder:font-normal focus:ring-0 focus:outline-none",
        className
      )}
      {...props}
    />
  );
}

export { Input };
