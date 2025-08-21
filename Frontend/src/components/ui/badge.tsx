import React from "react";

export const Badge = ({
  children,
  variant = "default",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "outline" | "secondary" }) => {
  let base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  let style =
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-700"
      : variant === "secondary"
      ? "bg-gray-100 text-gray-700"
      : "bg-blue-600 text-white";
  return (
    <span className={`${base} ${style} ${className}`} {...props}>
      {children}
    </span>
  );
};