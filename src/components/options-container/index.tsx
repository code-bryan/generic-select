import React from "react";
import classNames from "classnames";
import { OptionContainerProps } from "../../types";

export function useOptionContainer(props: OptionContainerProps) {
  const className = classNames(
    'option-container',
    {
      'flex': props.open,
      'hidden': !props.open
    }
  );

  return {
    model: {
      className,
    },
    operations: {

    }
  }
}

export default function OptionContainer(props: OptionContainerProps) {
  const { options, OptionComponent, EmptyListComponent } = props;
  const { model } = useOptionContainer(props);
  return (
    <div style={props.style} className={model.className}>
      <>
        {options.map((value, index) => OptionComponent?.({
          value,
          index,
          options,
        }))}

        {options.length <= 0 && EmptyListComponent?.()}
      </>
    </div>
  );
}