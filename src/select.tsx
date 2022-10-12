import React, { ChangeEvent, CSSProperties, forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Configuration, InjectableComponents, OptionInterface, SelectRef } from "./types";
import classNames from "classnames";
import { ContentRenderer, DropdownIcon, EmptyList, OptionContainer, PortalContainer } from './components';

interface Props {
  placeholder?: string;
  value?: string | number;
  className?: string;
  config?: Configuration;
  components?: InjectableComponents<OptionInterface>
}

const positionContainerInElement = (rect: DOMRect): CSSProperties => {
  const { top, right, left, width } = rect;
  return {
    top: top + 46,
    right,
    left,
    width,
    zIndex: 9999999999
  }; 
}

export function useSelect(props: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [current, setCurrent] = useState<OptionInterface>();

  const Content = useMemo(() => props.components?.ContentRenderComponent || ContentRenderer, [props.components]);
  const Icon = useMemo(() => props.components?.DropdownIconComponent || DropdownIcon, [props.components]);
  const Container = useMemo(() => props.components?.OptionsContainerComponent || OptionContainer, [props.components]);
  const EmptyListComponent = useMemo(() => props.components?.EmptyListComponent || EmptyList, [props.components]);

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
        Icon,
        Container,
        EmptyListComponent
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
  const { Content, Icon, Container, EmptyListComponent } = model.components;

  const optionContainerStyles = useMemo((): CSSProperties => {
    if (props.config?.portal && container.current) {
      return positionContainerInElement(container.current.getBoundingClientRect());
    }

    return { position: 'absolute', width: '100%' };
  }, [container.current, props.config]);

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
        <Container 
          open={model.open}
          options={[]}
          style={optionContainerStyles}
          EmptyListComponent={() => <EmptyListComponent />}
        />
      </PortalContainer>
    </div>
  );
});