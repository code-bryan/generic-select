import { FC } from "react";
import { OptionInterface, ContentRendererProps } from ".";

export interface InjectableComponents<Option = OptionInterface> {
  ContentRenderComponent?: FC<ContentRendererProps<Option>> | null;
}