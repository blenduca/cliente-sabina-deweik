import * as React from "react";

export interface BadgeProps {
  /** dark = black pill / amarelo text. light = amarelo pill / black text. */
  variant?: "dark" | "light";
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): React.JSX.Element;
