import * as React from "react";

export interface PriceCardProps {
  /** free = verde community block. premium = dark companies/paid block. */
  variant?: "free" | "premium";
  tag?: string;
  title?: string;
  /** Headline figure ("Gratuito.", "R$ 197"). Optional. */
  price?: string;
  description?: string;
  ctaLabel?: string;
}

export declare function PriceCard(props: PriceCardProps): React.JSX.Element;
