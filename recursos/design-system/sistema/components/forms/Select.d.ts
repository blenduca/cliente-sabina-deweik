export interface SelectOption { value: string; label: string; }
export interface SelectProps {
  label?: string;
  hint?: string;
  error?: string;
  /** Array of strings or {value,label} objects. */
  options: (string | SelectOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  id?: string;
}
