import React from "react";

export const Button = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}) => {
  let base = "inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none";
  let style =
    variant === "outline"
      ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
      : variant === "ghost"
      ? "text-gray-600 hover:bg-gray-100"
      : "bg-blue-600 text-white hover:bg-blue-700";
  let padding =
    size === "sm"
      ? "px-3 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-base";
  return (
    <button className={`${base} ${style} ${padding} ${className}`} {...props}>
      {children}
    </button>
  );
};