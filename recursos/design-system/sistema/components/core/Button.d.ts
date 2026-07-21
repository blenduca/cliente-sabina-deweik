import * as React from "react";

export interface ButtonProps {
  /** Fill style. dark = black pill / amarelo text (primary). light = amarelo pill / black text. */
  variant?: "dark" | "light";
  size?: "md" | "lg";
  /** Append the trailing → arrow used on nearly every campaign CTA. */
  icon?: boolean;
  disabled?: boolean;
  as?: "button" | "a";
  href?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export declare function Button(props: ButtonProps): React.JSX.Element;
