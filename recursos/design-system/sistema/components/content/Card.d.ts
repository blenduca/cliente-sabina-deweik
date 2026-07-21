import * as React from "react";

export interface CardProps {
  title?: string;
  description?: string;
  /** Block fill — a brand hue token, cycled section by section. Default preto. */
  accentBg?: string;
  /** Text color that reads on accentBg. Default branco. */
  accentColor?: string;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): React.JSX.Element;
