import { OptionInterface } from ".";
import { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export interface ContentRendererProps<Option = OptionInterface> extends InputProps {
  text: string;
  option?: Option;
}