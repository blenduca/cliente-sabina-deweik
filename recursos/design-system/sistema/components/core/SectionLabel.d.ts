import * as React from "react";

export interface SectionLabelProps {
  /** Eyebrow color — set to the current section's contrast hue (default amarelo). */
  color?: string;
  children?: React.ReactNode;
}

export declare function SectionLabel(props: SectionLabelProps): React.JSX.Element;
