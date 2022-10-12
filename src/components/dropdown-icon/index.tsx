import React from 'react';
import { DropdownIconProps } from "../../types";
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md'

export default function DropdownIcon(props: DropdownIconProps) {
  return (
    <div className='min-w-10 flex items-center justify-center select-none' onClick={props.onClick}>
      {props.open ? <MdArrowDropUp size={26} /> : <MdArrowDropDown size={26} /> }
    </div>
  );
}