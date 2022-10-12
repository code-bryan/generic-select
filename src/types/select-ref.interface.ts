import { OptionInterface } from "./option.interface";

export interface SelectRef<Option = OptionInterface> {
  open: boolean;
  text: string;
  value?: Option;
  openDropdown: () => void;
  clearInput: () => void;
}