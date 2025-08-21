import React from "react";
export const Calendar = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`border rounded-md p-4 text-center ${className}`} {...props}>
    {/* Placeholder calendar */}
    <span className="text-gray-400">[Calendar Component]</span>
  </div>
);