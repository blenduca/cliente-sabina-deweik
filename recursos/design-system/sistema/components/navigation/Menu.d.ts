export interface MenuItem { label?: string; onClick?: () => void; danger?: boolean; divider?: boolean; }
export interface MenuProps {
  label?: string;
  items: (string | MenuItem)[];
  align?: "left" | "right";
}
