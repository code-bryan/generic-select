import { CSSProperties } from "react";
import { OptionInterface, OptionProps } from ".";

export interface OptionContainerProps<Option = OptionInterface> {
  options: Option[];
  open?: boolean;
  style?: CSSProperties;
  OptionComponent?: (props: Partial<OptionProps>) => JSX.Element;
  EmptyListComponent?: (props?: any) => JSX.Element;
}