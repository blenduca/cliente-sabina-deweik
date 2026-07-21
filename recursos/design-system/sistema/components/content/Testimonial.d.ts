import * as React from "react";

export interface TestimonialProps {
  quote: string;
  cite?: string;
  /** Block fill (default rosa). */
  accentBg?: string;
  accentColor?: string;
}

export declare function Testimonial(props: TestimonialProps): React.JSX.Element;
