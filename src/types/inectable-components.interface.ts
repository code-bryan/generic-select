import { FC } from "react";
import { OptionInterface, ContentRendererProps, DropdownIconProps } from ".";

export interface InjectableComponents<Option = OptionInterface> {
  ContentRenderComponent?: FC<ContentRendererProps<Option>> | null;
  DropdownIconComponent?: FC<DropdownIconProps> | null;
}