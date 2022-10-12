import React from 'react';
import { forwardRef, useMemo } from "react";
import { ContentRendererProps } from "../../types/content-renderer.interface";
import classNames from 'classnames';

export function useContentRenderer(props: ContentRendererProps) {

  const currentText = useMemo(() => {
    if (!props.option) return undefined;
    return props.option.content;
  }, [props.option]);
  
  const className = classNames(
    props.className,
    {
      'w-full outline-none px-2 py-3 flex-1 cursor-pointer': true,
      'placeholder-gray-700': !currentText,
      'placeholder-black': !!currentText,
    }
  );
  
  return {
    model: {
      currentText,
      className,
    },
    operations: {},
  };
}

export default forwardRef<HTMLInputElement, ContentRendererProps>(function (props, ref) {
  const { model } = useContentRenderer(props);

  return (
    <input
      {...props}
      ref={ref}
      value={props.text}
      className={model.className}
      placeholder={model.currentText || props.placeholder}
    />
  );
})