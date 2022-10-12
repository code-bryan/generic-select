import { CSSProperties } from "react";
import { OptionInterface, OptionProps } from ".";

export interface OptionContainerProps<Option = OptionInterface> {
  options: Option[];
  open?: boolean;
  style?: CSSProperties;
  OptionComponent?: (props: Partial<OptionProps>) => void;
  EmptyListComponent?: (props?: any) => JSX.Element;
}