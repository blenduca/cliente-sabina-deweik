export interface TabItem { value: string; label: string; }
export interface TabsProps {
  tabs: (string | TabItem)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: "line" | "pill";
}
