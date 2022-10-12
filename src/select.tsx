import React, { ChangeEvent, forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Configuration, InjectableComponents, OptionInterface, SelectRef } from "./types";
import classNames from "classnames";
import { ContentRenderer, DropdownIcon, PortalContainer } from './components';

interface Props {
  placeholder?: string;
  value?: string | number;
  className?: string;
  config?: Configuration;
  components?: InjectableComponents<OptionInterface>
}

export function useSelect(props: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [current, setCurrent] = useState<OptionInterface>();

  const Content = useMemo(() => props.components?.ContentRenderComponent || ContentRenderer, [props.components]);
  const Icon = useMemo(() => props.components?.DropdownIconComponent || DropdownIcon, [props.components]);

  const containerClassNames = classNames(
    'select-container',
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    setCurrent(undefined);
  }

  const clearText = () => setText('');

  const toogleOpen = () => setOpen(open => !open);
  const openDropdown = () => setOpen(true);

  return {
    model: {
      open,
      text,
      current,
      containerClassNames,
      components: {
        Content,
        Icon
      }
    },
    operations: {
      handleInputChange,
      toogleOpen,
      openDropdown,
      clearText,
    },
  };
}

export default forwardRef<SelectRef, Props>(function Select(props, ref) {
  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const { model, operations } = useSelect(props);
  const { Content, Icon } = model.components;

  useImperativeHandle(ref, () => ({
    ...model,
    value: model.current,
    openDropdown: () => operations.openDropdown(),
    clearInput: () => operations.clearText(),
  }));

  return (
    <div ref={container} className={model.containerClassNames}>
      <div className="select">
        <Content 
          ref={input}
          text={model.text}
          option={model.current}
          placeholder={props.placeholder}
          onChange={operations.handleInputChange}
          onClick={operations.toogleOpen}
        />

        <Icon 
          open={model.open}
          onClick={operations.toogleOpen}
        />
      </div>

      <PortalContainer portal={props.config?.portal}>
        
      </PortalContainer>
    </div>
  );
});