/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as LucideIcons from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export const DynamicIcon = ({ name, className }: DynamicIconProps) => {
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    const Fallback = (LucideIcons as any).CircleHelp || (LucideIcons as any).HelpCircle;
    return <Fallback className={className} />;
  }

  return <IconComponent className={className} />;
};
