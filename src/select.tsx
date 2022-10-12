import React from 'react';
import { InjectableComponents, OptionInterface } from "./types";
import classNames from "classnames";
import { ChangeEvent, forwardRef, useMemo, useRef, useState } from "react";
import { ContentRenderer } from './components';

interface Configuration {
  portal?: boolean;
}
interface Props {
  placeholder?: string;
  value?: string | number;
  className?: string;
  config?: Configuration;
  components?: InjectableComponents<OptionInterface>
}

export interface BaseSelectRef<O = any> {
  open: boolean;
  text: string;
  value?: O;
  openDropdown: () => void;
  clearInput: () => void;
}

export function useSelect(props: Props) {
  const [text, setText] = useState('');
  const [current, setCurrent] = useState<OptionInterface>();

  const Content = useMemo(() => props.components?.ContentRenderComponent || ContentRenderer, []);

  const containerClassNames = classNames(
    'select-container',
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    setCurrent(undefined);
  }

  return {
    model: {
      text,
      current,
      containerClassNames,
      Content,
    },
    operations: {
      handleInputChange,
    },
  };
}

export default forwardRef<BaseSelectRef, Props>(function Select(props) {
  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const { model } = useSelect(props);

  const { Content } = model;

  return (
    <div ref={container} className={model.containerClassNames}>
      <div className="select">
        <Content 
          ref={input}
          text={model.text}
          option={model.current}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
});