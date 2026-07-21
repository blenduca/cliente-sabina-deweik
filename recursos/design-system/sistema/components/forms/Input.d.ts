export interface InputProps {
  label?: string;
  hint?: string;
  /** Error message — turns the border/hint red (laranja). */
  error?: string;
  size?: "sm" | "md" | "lg";
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  id?: string;
}
