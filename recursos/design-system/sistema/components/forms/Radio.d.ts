export interface RadioOption { value: string; label: string; }
export interface RadioProps {
  name?: string;
  options: (string | RadioOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}
