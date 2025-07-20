import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(({ className, children, loading = false, loadingText, disabled, ...props }, ref) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        loading && "cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 bg-inherit flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          {loadingText || "Loading..."}
        </div>
      )}
      <span className={cn("transition-opacity duration-200", loading && "opacity-0")}>
        {children}
      </span>
    </Button>
  );
});

LoadingButton.displayName = "LoadingButton";
