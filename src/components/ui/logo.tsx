import { cn } from "@/lib/utils";
import { SVGAttributes } from "react";

export function Logo({ className, ...props }: SVGAttributes<SVGElement>) {
  return (
    <svg
      width="49"
      height="48"
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, "size-4")}
      {...props}
    >
      <path
        d="M0 12.1H13.5C15 12.1 16.2 13.3 16.2 14.8C16.2 16.3 15 17.5 13.5 17.5H0C0.5 24.3 6.2 29.6 13.1 29.6H13.6C15.1 29.6 16.3 30.8 16.3 32.3C16.3 33.8 15.1 35 13.6 35H13.1C6.2 35 0.5 40.3 0 47.1H35.9C42.8 47.1 48.5 41.8 49 35H35.5C34 35 32.8 33.8 32.8 32.3C32.8 30.8 34 29.6 35.5 29.6H49C48.5 22.8 42.8 17.5 35.9 17.5H35.4C33.9 17.5 32.7 16.3 32.7 14.8C32.7 13.3 33.9 12.1 35.4 12.1H35.9C42.8 12.1 48.5 6.8 49 0H13.1C6.2 0 0.5 5.3 0 12.1Z"
        fill="#201B21"
      />
    </svg>
  );
}
