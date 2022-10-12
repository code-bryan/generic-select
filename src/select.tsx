import { forwardRef, useRef } from "react";

export interface BaseSelectRef<O = any> {
  open: boolean;
  text: string;
  value?: O;
  openDropdown: () => void;
  clearInput: () => void;
}

export function useSelect() {
  return {
    model: {},
    operations: {},
  };
}

const Select = forwardRef<BaseSelectRef>(() => {
  const divRef = useRef<HTMLDivElement>(null);

  const {} = useSelect();

  return (
    <div ref={divRef}>
      <div>
        
      </div>
    </div>
  );
});

export default Select;