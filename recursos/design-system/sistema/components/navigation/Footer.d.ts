export interface FooterLink { label: string; href?: string; }
export interface FooterColumn { title: string; links: (string | FooterLink)[]; }
export interface FooterProps {
  brand?: string;
  tagline?: string;
  columns?: FooterColumn[];
  contact?: string[];
}
