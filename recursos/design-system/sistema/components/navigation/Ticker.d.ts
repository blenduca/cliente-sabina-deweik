import * as React from "react";

export interface TickerProps {
  /** Phrases cycled through the marquee, separated by ★. */
  items?: string[];
  /** Full-loop duration in seconds (default 22). Lower = faster. */
  speed?: number;
}

export declare function Ticker(props: TickerProps): React.JSX.Element;
