export interface NavLink { label: string; href?: string; }
export interface NavbarProps {
  brand?: string;
  links: (string | NavLink)[];
  /** Label of the active link (underlined in accent). */
  active?: string;
  cta?: string;
  sticky?: boolean;
}
