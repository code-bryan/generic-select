import { FC } from "react";
import { OptionInterface, ContentRendererProps, DropdownIconProps, OptionContainerProps } from ".";

export interface InjectableComponents<Option = OptionInterface> {
  ContentRenderComponent?: FC<ContentRendererProps<Option>> | null;
  DropdownIconComponent?: FC<DropdownIconProps> | null;
  OptionsContainerComponent?: FC<OptionContainerProps> | null;
  EmptyListComponent?: FC | null;
}