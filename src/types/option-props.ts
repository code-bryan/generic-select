import { OptionInterface } from ".";

export interface OptionProps<Option = OptionInterface> {
  value: Option;
  index: number;
  options: Option[];
  selected?: boolean;
  onOptionSelected?: (value: Option) => void;
}