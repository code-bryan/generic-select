import React, { ChangeEvent, CSSProperties, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Configuration, InjectableComponents, OptionInterface, SelectRef } from "./types";
import classNames from "classnames";
import { ContentRenderer, DropdownIcon, EmptyList, OptionContainer, PortalContainer, Option } from './components';
import useClickOutside from './hooks/use-click-outside';

interface Props<Option = OptionInterface> {
  placeholder?: string;
  value?: string | number;
  className?: string;
  options?: Option[];
  config?: Configuration;
  components?: InjectableComponents<OptionInterface>;
  onEmpty?: (text: string) => void;
  onChange?: (option?: OptionInterface) => void;
  onTextChange?: (text: string) => void;
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

export function useSelect(props: Props, outside?: boolean) {
  const { options = [], value = '', components } = props;

  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [current, setCurrent] = useState<OptionInterface>();

  const Content = useMemo(() => components?.ContentRenderComponent || ContentRenderer, [components]);
  const Icon = useMemo(() => components?.DropdownIconComponent || DropdownIcon, [components]);
  const Container = useMemo(() => components?.OptionsContainerComponent || OptionContainer, [components]);
  const EmptyListComponent = useMemo(() => components?.EmptyListComponent || EmptyList, [components]);
  const OptionComponent = useMemo(() => components?.OptionComponent || Option, [components])

  const filteredOptions = useMemo(() => {
    const result = options.filter((v) => {
      if (typeof v.content !== 'string') {
        return v.value.toString().toLowerCase().includes(text.toLowerCase());
      }

      return v.content.toLowerCase().includes(text.toLowerCase());
    });

    return result;
  }, [options, text]);

  const containerClassNames = classNames(
    'select-container',
  );

  const handleOptionSelected = (option: OptionInterface) => {
    setOpen(false);
    setText('');
    setCurrent(option);
    props.onChange?.(option);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    setCurrent(undefined);
  }

  const clearText = () => setText('');

  const toogleOpen = () => setOpen(open => !open);
  const openDropdown = () => setOpen(true);

  useEffect(() => {
    if (!outside) return;
    setOpen(false);
  }, [outside]);

  useEffect(() => {
    if (filteredOptions.length <= 0) {
      props.onEmpty?.(text);
    }
  }, [filteredOptions]);

  useEffect(() => {
    if (current != null) return;

    const option = filteredOptions.find((v) => {
      return v.value == value;
    });

    setCurrent(option);
  }, [current, value, filteredOptions]);

  useEffect(() => {
    if (!current) return;

    const opt = filteredOptions.find((v) => v.value === current?.value);
    if (opt && current === opt) return;

    setCurrent(opt);
  }, [filteredOptions]);

  return {
    model: {
      open,
      text,
      current,
      containerClassNames,
      filteredOptions,
      components: {
        Content,
        Icon,
        Container,
        EmptyListComponent,
        OptionComponent
      }
    },
    operations: {
      handleInputChange,
      toogleOpen,
      openDropdown,
      clearText,
      handleOptionSelected,
    },
  };
}

export default forwardRef<SelectRef, Props>(function Select(props, ref) {
  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const outside = useClickOutside(container);
  const { model, operations } = useSelect(props, outside);
  const { Content, Icon, Container, EmptyListComponent, OptionComponent } = model.components;

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
          options={model.filteredOptions}
          style={optionContainerStyles}
          EmptyListComponent={() => <EmptyListComponent />}
          OptionComponent={(option) => (
            <OptionComponent 
              key={option.value?.value}
              index={option.index as number}
              options={option.options as OptionInterface[]}
              value={option.value as OptionInterface}
              selected={option.value?.value == model.current?.value} 
              onOptionSelected={operations.handleOptionSelected}
            />
          )}
        />
      </PortalContainer>
    </div>
  );
});