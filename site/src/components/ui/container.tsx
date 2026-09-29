import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {
  narrow?: boolean;
}

export function Container({ className, narrow, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-16",
        narrow ? "max-w-(--container-narrow)" : "max-w-(--container-content)",
        className,
      )}
      {...props}
    />
  );
}
