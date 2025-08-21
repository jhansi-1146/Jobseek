import React, { ReactNode } from "react";

type TabsProps = {
  children: ReactNode;
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export const TabsList: React.FC<TabsProps> = ({ children, className = "" }) => (
  <div className={`flex gap-2 ${className}`}>{children}</div>
);

type TabsTriggerProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  children,
  onClick,
  className = "",
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded bg-gray-100 text-gray-700 ${className}`}
  >
    {children}
  </button>
);

export const TabsContent: React.FC<TabsProps> = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);