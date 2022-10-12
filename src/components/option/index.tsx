import classNames from "classnames";
import React from "react";
import { OptionInterface, OptionProps } from "../../types";

export function optionClassName<Option = OptionInterface>(index: number, options: Option[], selected?: boolean) {
  return classNames('option', {
    'bg-teal-200': !!selected,
    'border-b': index !== options.length - 1,
  });
}

export default function Option(props: OptionProps) {
  const { value, index, options, selected, onOptionSelected } = props;

  return (
    <div
      onMouseDown={() => onOptionSelected?.(value)}
      className={optionClassName(index, options, selected)}
    >
      <span className="text-sm leading-5">
        {value.content}
      </span>
    </div>
  );
}