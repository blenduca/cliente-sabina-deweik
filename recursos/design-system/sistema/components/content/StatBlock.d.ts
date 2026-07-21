import * as React from "react";

export interface StatBlockProps {
  value: string;
  label: string;
  /** Number color — pick a brand hue per stat (default amarelo). */
  valueColor?: string;
}

export declare function StatBlock(props: StatBlockProps): React.JSX.Element;
